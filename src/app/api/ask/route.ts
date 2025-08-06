import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are Ava, a smart assistant for a high-end design-build company.",
      },
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.7,
  });

  const answer = response.choices[0]?.message.content ?? "Something went wrong.";

  return NextResponse.json({ answer });
}
