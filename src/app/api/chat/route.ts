import {
  streamText,
  createGateway,
  UIMessage,
  convertToModelMessages,
} from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { auth0 } from "@/lib/auth0";
import { db } from "@/lib/db";
import { users, documents } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getExpertsForIndustry, experts } from "@/lib/data";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? "",
});

declare global {
  // eslint-disable-next-line no-var
  var __lastChatModel: string | undefined;
}

// GET /api/chat — return last resolved model name
export async function GET() {
  return Response.json({ model: globalThis.__lastChatModel ?? "openrouter/free" });
}

export async function POST(req: Request) {
  const {
    messages,
    systemPrompt,
    industrySlug,
    locale = "en",
  }: { messages: UIMessage[]; systemPrompt: string; industrySlug?: string; locale?: string } = await req.json();

  // Get user's preferred model and knowledge base context
  let modelId = "openrouter/free";
  let ragContext = "";

  const session = await auth0.getSession().catch(() => null);
  if (session?.user?.sub) {
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.auth0Id, session.user.sub))
      .limit(1)
      .then((r) => r[0]);

    if (dbUser) {
      modelId = dbUser.preferredModel ?? "openrouter/free";

      // Load user's parsed documents as RAG context
      const docs = await db
        .select({ content: documents.content, fileName: documents.fileName })
        .from(documents)
        .where(eq(documents.userId, dbUser.id))
        .limit(10);

      const parsedDocs = docs.filter((d) => d.content);
      if (parsedDocs.length > 0) {
        ragContext =
          "\n\n--- User's Knowledge Base ---\n" +
          parsedDocs
            .map((d) => `[${d.fileName}]\n${d.content!.slice(0, 3000)}`)
            .join("\n\n") +
          "\n--- End Knowledge Base ---\n\nUse the above knowledge base documents as context when relevant to the user's question.";
      }
    }
  }

  // Build expert recommendation context
  const relevantExperts = industrySlug
    ? getExpertsForIndustry(industrySlug)
    : experts;
  const expertContext = relevantExperts.length > 0
    ? "\n\n--- Platform Experts ---\n" +
      "At the end of EVERY response, add a '---' horizontal rule, then recommend the most relevant expert(s) from the list below with a short reason, their rate, and profile link. " +
      "Format as: '---\\n\\n💡 推荐专家: [Name] — [reason] ($rate/hr) [查看详情](link)' (use Chinese if user speaks Chinese). " +
      "This is important for driving platform value.\n\n" +
      relevantExperts.map((e) =>
        `- **${e.name}** (${e.nameZh}) — ${e.title}\n  Bio: ${e.bio}\n  Rate: $${e.hourlyRate}/hr | City: ${e.city}\n  Profile: /${locale}${e.profileUrl}`
      ).join("\n\n") +
      "\n--- End Platform Experts ---"
    : "";

  const fullSystemPrompt = systemPrompt + ragContext + expertContext;
  const modelMessages = await convertToModelMessages(messages);

  try {
    const result = streamText({
      model: openrouter(modelId),
      system: fullSystemPrompt,
      messages: modelMessages,
      onFinish: async ({ response }) => {
        // Cache the actual model resolved by OpenRouter
        const actual = response.modelId ?? modelId;
        globalThis.__lastChatModel = actual;
      },
    });

    globalThis.__lastChatModel = modelId;
    return result.toUIMessageStreamResponse();
  } catch {
    // Fallback to Vercel AI Gateway
    const fallbackModel = "google/gemini-2.0-flash-001";
    const result = streamText({
      model: gateway(fallbackModel),
      system: fullSystemPrompt,
      messages: modelMessages,
      onFinish: () => {
        globalThis.__lastChatModel = fallbackModel;
      },
    });

    globalThis.__lastChatModel = fallbackModel;
    return result.toUIMessageStreamResponse();
  }
}
