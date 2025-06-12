import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod/v4";
import { generateImage } from "@/lib/gemini";
import { removeBackground } from "@/lib/removebg";

const app = new Hono()
  .post(
    "/remove-bg",
    // Add verification
    zValidator(
      "json",
      z.object({
        imageUrl: z.string(),
      })
    ),
    async (c) => {
      const { imageUrl } = c.req.valid("json");

      const processedImageUrl = await removeBackground(imageUrl);

      return c.json({
        success: true,
        imageUrl: processedImageUrl,
        message: "Background removed successfully",
      });
    }
  )
  .post(
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
