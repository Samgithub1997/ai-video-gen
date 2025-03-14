import { generateScript } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT = `Generate two high-impact, viral, addictive, scroll-stopping 60-second video scripts on the topic [topic_name]. The scripts must be sharp, engaging, and addictive, ensuring maximum audience retention. No scene descriptions. No brackets. No fluff.
Just deliver the raw, compelling storytelling in pure text format that finishes within the time frame.
Return the response in JSON format, adhering strictly to the following schema: 
- {
    scripts:[
        { 
            content:"" 
        },
    ]
}`;

export async function POST(req: any) {
  const { topic } = await req.json();
  const PROMPT = SCRIPT_PROMPT.replace("[topic_name]", topic);
  const result = await generateScript.sendMessage(PROMPT);
  console.log(result);
  const generatedStories = result?.response?.text();

  return NextResponse.json(JSON.parse(generatedStories));
}
