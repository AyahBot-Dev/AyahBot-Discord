import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type pino from "pino";

const pingCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction: ChatInputCommandInteraction, log: pino.Logger) {
    await interaction.reply("Pong!");
  },
};

export default pingCommand;
