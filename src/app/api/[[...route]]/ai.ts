import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod/v4";
import { generateImage } from "@/lib/gemini";

const app = new Hono().post(
  "/generate-image",
  // Add verification,
  zValidator(
    "json",
    z.object({
      prompt: z.string(),
    })
  ),
  async (c) => {
    const { prompt } = c.req.valid("json");

    const imageUrl = await generateImage(prompt);

    return c.json({
      sucess: true,
      imageUrl,
      message: "Image generated successfully",
    });
  }
);

export default app;
