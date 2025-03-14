import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.json();
        console.log("Form data in the request of /generate-video/route.ts: ", formData)
        if (!formData || Object.keys(formData).length === 0) {
            return NextResponse.json(
                { error: "Missing or empty request body" },
                { status: 400 }
            );
        }
        const req = {
            text: formData?.script,
            voice: formData?.voice
        }
        console.log("Request  in the request of /generate-video/route.ts: ", req)
        const result = await inngest.send({
            name: "generate-video",
            data: req, 
        });

        return NextResponse.json({ result });
    } catch (error: any) {
        console.error("Error in generate-video API:", error);
        return NextResponse.json(
            { error: "Failed to send event to Inngest", details: error.message },
            { status: 500 }
        );
    }
}
