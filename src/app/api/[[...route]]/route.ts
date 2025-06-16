import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";

import images from "./images";
import ai from "./ai";
import users from "./users";
import authConfig from "@/auth.config";

// Revert to "edge", if planning to run on edge
export const runtime = "nodejs";

const getAuthConfig = (c: Context): AuthConfig => {
  return {
    secret: c.env?.AUTH_SECRET!,
    ...authConfig,
  };
};

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

const routes = app
  .route("/users", users)
  .route("/images", images)
  .route("/ai", ai);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
