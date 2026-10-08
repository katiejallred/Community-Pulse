import { defineConfig } from "drizzle-kit";

// Used by `npx drizzle-kit push` / `generate` to apply the schema to Neon.
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
