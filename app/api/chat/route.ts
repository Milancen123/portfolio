// /app/api/chat/route.ts
import { groq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const modelMessages = convertToModelMessages(messages);

  const result = await streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: modelMessages,
  });

  return result.toTextStreamResponse();
}