import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";

import images from "./images";
import ai from "./ai";
import users from "./users";
import projects from "./projects";
import subscriptions from "./subscriptions";
import authConfig from "@/auth.config";

// Revert to "edge", if planning to run on edge
export const runtime = "nodejs";

const getAuthConfig = (c: Context): AuthConfig => {
  return {
    secret: c.env?.AUTH_SECRET,
    ...authConfig,
  };
};

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/users", users)
  .route("/images", images)
  .route("/ai", ai)
  .route("projects", projects)
  .route("/subscriptions", subscriptions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
