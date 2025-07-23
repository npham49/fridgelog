import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

const app = new Hono();

app.use("/api/v1/*", clerkMiddleware());
app.get("/api/v1/hello", (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "Yo are not logged in.",
    });
  }

  return c.json({
    message: "You are logged in!",
    userId: auth.userId,
  });
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
