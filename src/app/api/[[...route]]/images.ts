import { Hono } from "hono";

const app = new Hono()
  .get("/", (c) => {
    return c.json({ data: { images: [] }})
  })

export default app