import { Hono } from "hono";

const app = new Hono()
  .get("/", (c) => {
    return c.json({ user: "GET" });
  })
  .get("/:name", (c) => {
    const name = c.req.param();

    if (true) {
      c.json({ error: "Something went wrong!" }, 400);
    }

    return c.json(name);
  });

export default app;
