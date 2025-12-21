import AyahBotClient from "@/classes/AyahBotClient.js";
import logger from "@/utils/logger.js";
import { Events } from "discord.js";

const readyEvent = {
  name: Events.ClientReady,
  once: true,
  execute(client: AyahBotClient<true>) {
    logger.info(`Ready! Logged in as ${client.user.tag}`);
  },
};

export default readyEvent;
