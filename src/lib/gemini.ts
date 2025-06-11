import { GoogleGenAI } from "@google/genai";

export async function generateImage(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY!;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY enivronment variable is not set");
  }

  const ai = new GoogleGenAI({
    apiKey,
  });

  const config = {
    responseModalities: ["IMAGE", "TEXT"],
    responseMimeType: "text/plain",
  };

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash-preview-image-generation",
    config,
    contents,
  });

  for await (const chunk of response) {
    if (!chunk.candidates?.[0]?.content?.parts) {
      continue;
    }

    const inlineData = chunk.candidates[0].content.parts[0].inlineData;
    if (inlineData) {
      const mimeType = inlineData.mimeType || "image/png";
      const base64Data = inlineData.data || "";

      return `data:${mimeType};base64,${base64Data}`;
    }
  }

  throw new Error("Failed to generate image");
}
