import { config as loadDotenv } from "dotenv";
import path from "node:path";
import { z } from "zod";

// Load .env from the repo root so `pulse` works from any folder in the repo.
loadDotenv({ path: path.resolve(process.cwd(), ".env"), quiet: true });
loadDotenv({ path: path.resolve(process.cwd(), "..", ".env"), quiet: true });

const schema = z.object({
  DISCORD_BOT_TOKEN: z.string().default(""),
  DATABASE_URL: z.string().default(""),
  ANTHROPIC_API_KEY: z.string().default(""),
  ANTHROPIC_MODEL: z.string().default("claude-haiku-5-5"),
  PULSE_SPENDING_CAP_USD: z.coerce.number().default(5),
  RESEND_API_KEY: z.string().default(""),
  REPORT_FROM_EMAIL: z.string().default(""),
  PORTAL_URL: z.string().default("http://localhost:3000"),
});

export type Config = z.infer<typeof schema>;

/** Read configuration from environment variables. Secrets are never logged. */
export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  return schema.parse(env);
}

/** Throw a friendly error if a required setting is missing. */
export function requireSetting(config: Config, key: keyof Config): string {
  const value = config[key];
  if (!value) {
    throw new Error(`${key} is not set. Add it to your .env file (see .env.example).`);
  }
  return String(value);
}
