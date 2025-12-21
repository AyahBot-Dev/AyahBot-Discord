import { Events, GatewayIntentBits } from "discord.js";
import env from "@/utils/config.js";
import AyahBotClient from "./classes/AyahBotClient.js";
import logger from "./utils/logger.js";

const client = new AyahBotClient({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient) => {
  logger.info(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(env.discord.token);
