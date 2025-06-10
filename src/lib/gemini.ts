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

async function convertUrlToBase64(
  imageUrl: string
): Promise<{ base64Data: string; mimeType: string }> {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64Data = Buffer.from(arrayBuffer).toString("base64");
  const mimeType = response.headers.get("content-type") || "image/jpeg";

  return { base64Data, mimeType };
}

export async function removeBackground(imageInput: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }

  const ai = new GoogleGenAI({ apiKey });

  const config = {
    responseModalities: ["IMAGE", "TEXT"],
    responseMimeType: "text/plain",
  };

  let base64Data: string;
  let mimeType: string;

  // Check if input is a data URL or regular URL
  if (imageInput.startsWith("data:image/")) {
    // It's a data URL (from canvas or file upload)
    base64Data = imageInput.split(",")[1];
    mimeType = imageInput.split(";")[0].split(":")[1];
  } else {
    // It's a regular URL (from Unsplash, etc.)
    const converted = await convertUrlToBase64(imageInput);
    base64Data = converted.base64Data;
    mimeType = converted.mimeType;
  }

  const prompt = `Remove the background from this image and make it completely transparent. 
  The output should be a SVG image with a transparent background so the subject can be placed on any background. 
  Keep the main subject intact and preserve all details, but remove everything else and make those areas fully transparent.`;

  const contents = [
    {
      role: "user" as const,
      parts: [
        {
          text: prompt,
        },
        {
          inlineData: {
            mimeType,
            data: base64Data,
          },
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
      const outputMimeType = inlineData.mimeType || "image/png";
      const outputBase64Data = inlineData.data || "";
      return `data:${outputMimeType};base64,${outputBase64Data}`;
    }
  }

  throw new Error("No processed image was generated");
}
