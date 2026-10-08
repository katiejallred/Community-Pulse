import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export * as schema from "./schema.js";

/**
 * Create a database client from a Postgres connection string.
 * The CLI and the portal both call this with DATABASE_URL.
 */
export function createDb(connectionString: string) {
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Copy .env.example to .env and fill it in.");
  }
  return drizzle(neon(connectionString));
}

export type Db = ReturnType<typeof createDb>;
