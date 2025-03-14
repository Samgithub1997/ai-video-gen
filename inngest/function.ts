// import { inngest } from "./client";

// export const helloWorld = inngest.createFunction(
//   { id: "hello-world" },
//   { event: "test/hello.world" },
//   async ({ event, step }) => {
//     await step.sleep("wait-a-moment", "1s");
//     return { message: `Hello ${event.data.email}!` };
//   },
// );

// export const GenerateVideo = inngest.createFunction(
//     {id: "generate-video"},
//     {event: "generate-video"},
//     async ({ event, step }) => {
//         // Variables
//         const {projectName, topic, script, videoStyle, voice, caption} = event?.data;

//         // Generate audio
//         const GenerateAudioFile = await step.run(
//             "GenerateAudioFile",
//             async() => {
//                 // write code
//                 const response = await fetch('/api/text-to-speech', {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json"
//                         },
//                         body: JSON.stringify({
//                             text: script, 
//                             voice: voice,
//                         }),
//                 });
//                 const data = response.json();
//                 console.log("function tsx : ", data);
//                 console.log("Generated Audio repsonse from /api/text-to-speech: ", response)
//                 if(!response.ok){
//                     console.log("Error in generating script voice", data)
//                 }
//                 if (typeof window !== 'undefined') {
                    
//                     const audio = new Audio(`data:audio/mpeg;base64,${data?.audio}`);
//                     // further client-side audio handling
//                     return audio
//                 }
//                 // const audio = new Audio(`data:audio/mpeg;base64,${data?.audio}`)
//                 return data;
//             }
//         )
//         // Generate captions

//         // Generate image prompts from script

//         // Images using AI models

//         // Save to convex database
//         return GenerateAudioFile
//     }
// )


import { NextResponse } from "next/server";
import { inngest } from "./client";

export const GenerateVideo = inngest.createFunction(
    { id: "generate-video" },
    { event: "generate-video" },
    async ({ event, step }) => {
        const { projectName, topic, script, videoStyle, voice, caption } = event?.data;
        console.log("Here 1")
        const GenerateAudioFile = await step.run("GenerateAudioFile", async () => {
            console.log("Here 2")
            try {
                console.log("Calling /api/text-to-speech with:", { script, voice });

                const response = await fetch("/api/text-to-speech", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: script, voice }),
                });

                const responseText = await response.text(); // Read raw response
                console.log("Text-to-Speech Raw Response:", responseText);

                if (!response.ok) {
                    console.error("Error Response from Eleven Labs:", responseText);
                    throw new Error(`Eleven Labs API Error: ${responseText}`);
                }

                let data;
                try {
                    data = JSON.parse(responseText); // Safely parse JSON
                } catch (jsonError: any) {
                    console.error("Failed to parse API response as JSON:", responseText);
                    throw new Error("Invalid JSON response from Eleven Labs");
                }

                console.log("Generated Audio File:", data);
                return data;
            } catch (error: any) {
                console.log(error?.detail)
                console.error("Error in GenerateAudioFile:", error);
                // throw new Error("Audio generation failed");
                return NextResponse.json({
                    error: error?.detail,
                })
            }
        });

        return GenerateAudioFile;
    }
);
