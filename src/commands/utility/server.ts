import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type pino from "pino";

const serverCommand = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server."),
  async execute(interaction: ChatInputCommandInteraction, log: pino.Logger) {
    await interaction.reply(
      `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`,
    );
  },
};

export default serverCommand;
