import {
	AutocompleteInteraction,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from "discord.js";
import moment from "moment-timezone";

import {
	syntax_error,
	invalid_datatype,
	embed_error,
	create_embed,
} from "../../lib/embeds/embeds";
import { colors } from "../../lib/embeds/infos";
import DBHandler from "../../lib/DBHandler";

import type {
	CacheType,
	CommandInteraction,
	CommandInteractionOption,
} from "discord.js";
import { findClosestMatchesBS } from "../../lib/utils";

export default {
	name: "timezone",
	description: "Set timezone for scheduled ayahs",
	category: "Settings",

	usage: "<timezone>",

	guildOnly: true,
	cooldown: 5,
	permissions: ["Administrator"],

	slash: new SlashCommandBuilder()
		.setName("timezone")
		.setDescription("Set timezone for scheduled ayahs")
		.addStringOption((option) =>
			option
				.setName("timezone")
				.setDescription("Enter a timezone (e.g. 'Asia/Dhaka')")
				.setAutocomplete(true)
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),

	async autocomplete(interaction: AutocompleteInteraction) {
		const input = interaction.options.getFocused();
		const filtered = await findClosestMatchesBS(input, moment.tz.names());
		await interaction.respond(
			filtered.map((choice: string) => ({ name: choice, value: choice }))
		);
	},

	async execute(
		interaction: CommandInteraction,
		args: readonly CommandInteractionOption<CacheType>[]
	) {
		// First: check if timezone valid
		if (!args[0])
			return await interaction.editReply({
				embeds: [await syntax_error("<timezone (e.g. Asia/Dhaka)>")],
			});

		const timezone = args[0]?.value as string;

		// let tzIsValid = await isValidTZ(args[0]);
		if (!moment.tz.zone(timezone))
			return await interaction.editReply({
				embeds: [
					await invalid_datatype(
						timezone,
						"a valid timezone listed [here](https://github.com/AyahBot-Dev/AyahBot-Discord/wiki/Timezones)"
					),
				],
			});

		// Second: try to store the timezone value, show error if returned false
		const res =
			(await DBHandler.settings.store(
				interaction.guild.id,
				undefined,
				timezone
			)) !== false &&
			(await DBHandler.scheduler.updateTZ(interaction.guild.id, timezone));

		if (!res && res !== null)
			return await interaction.editReply({ embeds: [embed_error] });

		return await interaction.editReply({
			embeds: [
				await create_embed(
					"Timezone settings: ",
					"Timezone changes saved",
					colors.success
				),
			],
		});
	},
};
