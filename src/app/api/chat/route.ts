import { streamText, createGateway, UIMessage, convertToModelMessages } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? "",
});

export async function POST(req: Request) {
  const {
    messages,
    systemPrompt,
  }: { messages: UIMessage[]; systemPrompt: string } = await req.json();

  const modelMessages = await convertToModelMessages(messages);

  // Try OpenRouter first, fallback to Vercel AI Gateway
  try {
    const result = streamText({
      model: openrouter("google/gemini-2.0-flash-001"),
      system: systemPrompt,
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch {
    // Fallback to Vercel AI Gateway
    const result = streamText({
      model: gateway("google/gemini-2.0-flash-001"),
      system: systemPrompt,
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  }
}
