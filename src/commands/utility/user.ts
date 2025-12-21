import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import pino from "pino";

const userCommand = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user."),
  async execute(interaction: ChatInputCommandInteraction, log: pino.Logger) {
    await interaction.reply(
      `Ayo! Mr. ${interaction.user.username}! You got ${interaction.member?.avatar}!`,
    );
  },
};

export default userCommand;
