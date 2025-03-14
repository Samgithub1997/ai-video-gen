import { NextResponse } from "next/server";

export async function POST(request: any) {
    try {
        const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
        if (!apiKey) {
            console.error("API Key for Eleven Labs is missing.");
            return NextResponse.json(
                { error: "API Key is not set. Check your .env.local file." },
                { status: 500 }
            );
        }

        const { script, voice } = await request.json();
        console.log("Text: ", script)
        console.log("Voice: ", voice)
        
        if (!script || !voice) {
            console.error("Missing script or voice_id", { script, voice });
            return NextResponse.json(
                { error: "Missing script or voice_id" },
                { status: 400 }
            );
        }

        console.log("Calling Eleven Labs API with:", { script, voice });

        const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
            {
                method: "POST",
                headers: {
                    Accept: "audio/mpeg",
                    "Content-Type": "application/json",
                    "xi-api-key": apiKey,
                },
                body: JSON.stringify({
                    text: script,
                    model_id: "eleven_multilingual_v2",
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                    },
                }),
            }
        );

        // Read response as text (avoid JSON parsing issues)
        const responseText = await response.text();
        console.log("Raw API Response:", responseText);

        // Handle non-200 responses
        if (!response.ok) {
            console.error("Eleven Labs API Error:", responseText);
            return NextResponse.json(
                { error: responseText },
                { status: response.status }
            );
        }

        // Convert raw audio response to base64
        const audioBuffer = Buffer.from(responseText, "base64");

        return NextResponse.json({ audio: audioBuffer.toString("base64") });
    } catch (err: any) {
        console.error("Text-to-Speech API Error:", err);
        return NextResponse.json(
            { error: "Internal Server Error", details: err.message },
            { status: 500 }
        );
    }
}
