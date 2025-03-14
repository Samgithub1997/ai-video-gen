const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const generateScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate two high-impact, viral, addictive, scroll-stopping 60-second video scripts on the topic Stoicism. The scripts must be sharp, engaging, and addictive, ensuring maximum audience retention. No scene descriptions. No brackets. No fluff.\nJust deliver the raw, compelling storytelling in pure text format.\nReturn the response in JSON format, adhering strictly to the following schema\n-{scripts:[ {content:""}, ]}',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "scripts": [\n    {\n      "content": "Are you overwhelmed? Stressed? Life crushing you? Good. Stoicism isn\'t about rainbows. It\'s about reality. Picture a Roman emperor, Marcus Aurelius, writing in his journal during wartime. That\'s Stoicism. It\'s not escapism. It\'s armor. Control what you can: your thoughts, your actions, your judgments. Everything else? Indifferent. Someone insults you? Their problem. You failed? Learn, adapt, move on. Don\'t be swayed by externals. Find your inner citadel. Build it brick by brick with reason, discipline, and virtue. Fear death? Why? It\'s inevitable. Embrace the present. Live virtuously now. That’s all that matters. Start small. One less complaint. One conscious breath. One act of kindness. Stoicism isn\'t a philosophy. It’s a practice. A path to resilience. A way to truly live. Stop reacting. Start acting. Be your own rock in a world of chaos. Become Stoic. Now."\n    },\n    {\n      "content": "Want to unlock peak performance? Forget gurus. Forget quick fixes. Dive into Stoicism. It’s the ancient operating system for a better life. Seneca, Epictetus, Aurelius – not just philosophers, but CEOs of their own existence. They faced exile, slavery, war. Yet, they thrived. How? They focused on what they controlled. Your emotions aren’t external forces. They’re judgments. Challenge them. Is that anger justified? Is that fear rational? Master your mind, master your life. Obstacles? Opportunities in disguise. Reframe every challenge as a chance to grow stronger, wiser, more resilient. Failure isn’t final. It’s feedback. Use it. Stoicism isn\'t about suppressing emotions. It’s about understanding them. Acknowledging them. Then choosing your response. Practice gratitude. Appreciate what you have. Focus on the present moment. Stop dwelling on the past. Stop fearing the future. Live intentionally. Live virtuously. Live like a Stoic. Because a life well-lived is the ultimate goal."\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
