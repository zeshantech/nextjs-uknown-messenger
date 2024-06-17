import OpenAI from "openai";
import { StreamingTextResponse, OpenAIStream } from "ai";

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const message = searchParams.get("message")!;

  console.log(message, "——————————————");
  

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    max_tokens: 80,
    messages: [
      {
        role: "system",
        content: message,
      },
    ],
  });

  console.log(response, "€€€€€€€€€€€€€€");
  
  
  const stream = OpenAIStream(response);
  console.log(response);
  return new StreamingTextResponse(stream);
}
