import { Collection } from "discord.js";

import { embed_error, coolDownsEmbed } from "../lib/embeds/embeds";
import { handleE } from "../lib/utils";

import type { Interaction } from "discord.js";

import type { CustomClient } from "../lib/classes/CustomClient";

export default async (client: CustomClient, interaction: Interaction) => {
	if (interaction.isChatInputCommand()) {
		const args = interaction.options.data;
		const command = await client.commands.get(interaction.commandName);
		try {
			if (command) {
				if (!client.cooldowns.has(command.name)) {
					client.cooldowns.set(command.name, new Collection());
				}

				const now = Date.now();
				const timestamps = client.cooldowns.get(command.name);
				const cooldownAmount = (command.cooldown || 3) * 1000;

				if (timestamps.has(parseInt(interaction.user.id))) {
					const expirationTime =
						timestamps.get(parseInt(interaction.user.id)) + cooldownAmount;

					if (now < expirationTime) {
						return interaction.reply({ embeds: [coolDownsEmbed] });
					}
				}

				timestamps.set(parseInt(interaction.user.id), now);
				setTimeout(
					() => timestamps.delete(parseInt(interaction.user.id)),
					cooldownAmount
				);
				/*
				if (command.guildOnly && !interaction.guild)
					return await interaction.reply({
						embeds: [
							await create_embed(
								"Not a DM command",
								`The command \`${interaction.commandName}\` is not a DM command`,
								colors.warning
							),
						],
					});

				if (command.ownerOnly && interaction.user.id != process.env.OWNER_ID)
					return await interaction.reply({
						embeds: [
							await create_embed(
								"Moderation Command",
								`The command \`${interaction.commandName}\` is a moderation command only usable by AyahBot staffs`,
								colors.warning
							),
						],
					});
				
				if (command.permissions) {
					const authorPerms = (
						interaction.channel as TextChannel
					).permissionsFor(interaction.user);
					if (!authorPerms || !authorPerms.has(command.permissions))
						return await interaction.reply({
							embeds: [
								await insufficient_perms(
									interaction.commandName,
									command.permissions as string[]
								),
							],
						});
				} */
				return (
					(await interaction.deferReply()) &&
					(await command.execute(interaction, args, client))
				);
			} else if (!command)
				return await interaction.reply(
					`The command \`${interaction.commandName}\` is not known to me`
				);
		} catch (e) {
			await handleE(e, "interactionCreate() chatinput processing");
			return interaction.deferred || interaction.replied
				? await interaction.followUp({ embeds: [embed_error], ephemeral: true })
				: await interaction.reply({ embeds: [embed_error], ephemeral: true });
		}
	}

	if (interaction.isAutocomplete()) {
		const command = await client.commands.get(interaction.commandName);
		if (command) {
			try {
				await command.autocomplete(interaction);
			} catch (e) {
				await handleE(e, "autocomplete issue");
				return;
			}
		}
	}

	if (interaction.isMessageContextMenuCommand()) {
		// handle message context menu commands
	}
};
