import {
	AutocompleteInteraction,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from "discord.js";

import { translations } from "../../lib/classes/Ayah";
import {
	invalid_datatype,
	embed_error,
	create_embed,
} from "../../lib/embeds/embeds";
import DBHandler from "../../lib/DBHandler";
import { colors } from "../../lib/embeds/infos";
import { findClosestMatchDIST } from "../../lib/utils";

import type {
	CacheType,
	CommandInteraction,
	CommandInteractionOption,
} from "discord.js";

import type { CustomClient } from "../../lib/classes/CustomClient";

export default {
	name: "qdefault",
	description: "Set default quran translation",
	category: "Settings",

	usage: "<translation_key>",

	guildOnly: true,
	cooldown: 5,
	permissions: ["Administrator"],

	slash: new SlashCommandBuilder()
		.setName("qdefault")
		.setDescription("Set default quran translation")
		.addStringOption((option) =>
			option
				.setName("translation")
				.setDescription(
					"Enter a translation code (e.g. 'hilali') from our translations wiki to be default for your server"
				)
				.setAutocomplete(true)
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),

	async autocomplete(interaction: AutocompleteInteraction) {
		const input = interaction.options.getFocused();
		const filtered = await findClosestMatchDIST(
			input,
			Object.keys(translations)
		);
		await interaction.respond(
			filtered.map((choice: string) => ({ name: choice, value: choice }))
		);
	},

	async execute(
		interaction: CommandInteraction,
		args: readonly CommandInteractionOption<CacheType>[],
		client: CustomClient
	) {
		const translation = args[0]?.value as string;

		if (translation == "remove") {
			const quranTrsIsRemoved =
				(await DBHandler.settings.remove(interaction.guild.id, "quran")) !==
				false;

			if (!quranTrsIsRemoved)
				return await interaction.editReply({ embeds: [embed_error] });

			client.quranTrs.cache.delete(interaction.guild.id);

			return await interaction.editReply({
				embeds: [
					await create_embed(
						"Custom Quran Translation was removed successfully",
						"In Shaa Allah, from now on, you will receive the default `hilali` translations",
						colors.success
					),
				],
			});
		}

		if (!translation || !translations[translation])
			return await interaction.editReply({
				embeds: [
					await invalid_datatype(
						translation,
						"a valid translation code listed [here](https://github.com/AyahBot-Dev/AyahBot-Discord/wiki/Translations)"
					),
				],
			});

		const quranIsSet =
			(await DBHandler.settings.store(interaction.guild.id, translation)) !==
			false;

		if (!quranIsSet)
			return await interaction.editReply({ embeds: [embed_error] });

		client.quranTrs.cache.set(interaction.guild.id, translations[translation]);

		return await interaction.editReply({
			embeds: [
				await create_embed(
					"Default Quran translation saved",
					`In Shaa Allah, from now on, you will receive \`${translation}\` translations by default`,
					colors.success
				),
			],
		});
	},
};
