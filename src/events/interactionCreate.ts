import type AyahBotClient from "@/classes/AyahBotClient.js";
import logger from "@/utils/logger.js";
import { Client, Events, MessageFlags, type Interaction } from "discord.js";

const readyEvent = {
  name: Events.InteractionCreate,
  async execute(client: AyahBotClient, interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const log = logger.child({
      guildId: interaction.guildId,
      user: interaction.user.tag,
      command: interaction.commandName,
    });

    const command = client?.commands.get(interaction.commandName);

    if (!command) {
      logger.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction, log);
    } catch (error) {
      logger.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
};

export default readyEvent;
