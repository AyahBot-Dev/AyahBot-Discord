import { z } from "zod";
import logger from "./logger.js";

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  TZ: z.string().optional(),

  // Discord essentials
  DISCORD_TOKEN: z.string().min(1), // Bot token
  CLIENT_ID: z.string().min(1), // Application client ID
  SERVER_ID: z.string().min(1), // Guild/server ID
});

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  logger.error({ error: logger.error }, "ENV_CONFIG_ERR");
  process.exit(1);
}

const env = parsed.data;

export const config = {
  nodeEnv: env.NODE_ENV,
  tz: env.TZ,

  discord: {
    token: env.DISCORD_TOKEN,
    clientId: env.CLIENT_ID,
    serverId: env.SERVER_ID,
  },
} as const;

export type Config = typeof config;
export default config;
