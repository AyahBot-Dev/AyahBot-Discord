import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { scheduledJobs } from "node-schedule";

import { embed_error, create_embed } from "../../lib/embeds/embeds";
import { colors } from "../../lib/embeds/infos";
import DBHandler from "../../lib/DBHandler";

import type { CommandInteraction } from "discord.js";

export default {
	name: "unschedule",
	description: "Unschedule your daily ayah reminder",
	category: "Settings",

	usage: "",

	guildOnly: true,
	cooldown: 5,
	permissions: ["Administrator"],

	slash: new SlashCommandBuilder()
		.setName("unschedule")
		.setDescription("Unschedule your daily ayah reminder")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),

	async execute(interaction: CommandInteraction) {
		const dTC = await DBHandler.settings.fetchRaw(interaction.guild.id);
		if (dTC?.spec && dTC?.channel) {
			const fromDBDeleted =
				(await DBHandler.settings.remove(
					interaction.guild.id,
					"spec",
					"channel",
					"lang"
				)) !== false;
			if (!fromDBDeleted)
				return await interaction.editReply({ embeds: [embed_error] });
			if (scheduledJobs[interaction.guild.id])
				await scheduledJobs[interaction.guild.id].cancel();
			return await interaction.editReply({
				embeds: [
					await create_embed(
						"Successfully unscheduled",
						"Alhamdulillah, you have successfully unscheduled your daily ayah reminder!",
						colors.success
					),
				],
			});
		} else
			return interaction.editReply({
				embeds: [
					await create_embed(
						"Not yet scheduled",
						"You haven't yet scheduled any daily ayahs in your server to delete that!",
						colors.warning
					),
				],
			});
	},
};
