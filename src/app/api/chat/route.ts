import { streamText, createGateway } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? "",
});

export async function POST(req: Request) {
  const { messages, systemPrompt } = await req.json();

  // Try OpenRouter first, fallback to Vercel AI Gateway
  try {
    const result = streamText({
      model: openrouter("google/gemini-2.0-flash-001"),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch {
    // Fallback to Vercel AI Gateway
    const result = streamText({
      model: gateway("google/gemini-2.0-flash-001"),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  }
}
