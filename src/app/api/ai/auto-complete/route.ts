import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { google } from "@/lib/gemini";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const message = searchParams.get("message")!;

  const prompt = `Hi Gemini,I'm using you as auto predection of message so kindly dont return any unexpected response you should work as an auto-prediction system to suggest the next 2 and 3 words based on the following message: "${message}" as in gmail or in word, just return response in 3 to 4 words of predective message and dont return it in options`;

  const { text } = await generateText({
    model: google("models/gemini-1.5-pro-latest"),
    prompt,
    maxTokens: 8,
  });

  return new Response(JSON.stringify({ text }), {
    headers: { "Content-Type": "application/json" },
  });
}
