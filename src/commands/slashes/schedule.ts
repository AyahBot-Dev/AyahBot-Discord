import {
	ChannelType,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from "discord.js";

import DBHandler from "../../lib/DBHandler";
import {
	embed_error,
	create_embed,
	invalid_datatype,
	syntax_error,
} from "../../lib/embeds/embeds";
import { colors } from "../../lib/embeds/infos";

import type {
	CacheType,
	CommandInteraction,
	CommandInteractionOption,
} from "discord.js";

import type { Lang } from "../../types";

export default {
	name: "schedule",
	description: "Schedule daily ayahs",
	category: "Settings",

	usage: "<channel's mention> <time (in 24 hours format)> <ayah_type>",

	guildOnly: true,
	cooldown: 5,
	permissions: ["Administrator"],

	slash: new SlashCommandBuilder()
		.setName("schedule")
		.setDescription("Schedule daily ayahs")
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("Select the channel you're wanting me to schedule at")
				.addChannelTypes(ChannelType.GuildText)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("time")
				.setDescription(
					"Enter the time (in 24 hours format) when you want me to send ayahs daily"
				)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("ayah_type")
				.setDescription(
					"Select any of 'Translated', 'Arabic' and 'Both' to show them daily"
				)
				.setRequired(true)
				.addChoices(
					{ name: "Translated", value: "en" },
					{ name: "Arabic", value: "ar" },
					{ name: "Both", value: "mixed" }
				)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),

	async execute(
		interaction: CommandInteraction,
		args: readonly CommandInteractionOption<CacheType>[]
	) {
		const channelIdU = args[0]?.value as string;
		const time = args[1].value as string;
		const ayah_type: string = (args[2].value as string).toLowerCase();

		// First: check if time is in correct format
		if (!/^\d{1,2}:\d{2}$/.test(time))
			return await interaction.editReply({
				embeds: [
					await syntax_error(
						"<channel's @>",
						"<time (in 24 hrs format)>",
						"<ayah_type>"
					),
				],
			});

		if (!["en", "ar", "mixed"].includes(ayah_type))
			return await interaction.editReply({
				embeds: [
					await invalid_datatype(ayah_type, "any of 'en', 'ar' and 'mixed'"),
				],
			});

		if (!interaction.guild.channels.cache.has(channelIdU))
			return await interaction.editReply({
				embeds: [
					await create_embed(
						"Channel not found",
						`The channel <#${channelIdU}> doesn't exist. Maybe forgot to create that?`,
						colors.error
					),
				],
			});

		// check perms
		const channel = await interaction.guild.channels.cache.get(channelIdU);
		const hasPerms = await interaction.guild.members.me
			.permissionsIn(channel)
			.has(["SendMessages", "ViewChannel", "EmbedLinks"]);

		if (!hasPerms)
			return await interaction.editReply({
				embeds: [
					await create_embed(
						"Insufficient permission I have",
						`I don't have permission to view, send messages \nand send embeds in <#${channelIdU}>. I at least need permissions to view the channel, send embeds and messages`,
						colors.warning
					),
				],
			});

		if (channel.type != ChannelType.GuildText)
			return await interaction.editReply({
				embeds: [
					await create_embed(
						"Only Text channels supported",
						`I can't send messages and embeds in <#${channelIdU}> as it's not a text channel`,
						colors.warning
					),
				],
			});

		const [hh, mm] = time.split(":").map(Number);
		// Second: check if time valid
		if (hh > 23 || hh < 0 || mm < 0 || mm > 59)
			return await interaction.editReply({
				embeds: [await invalid_datatype(time, "a valid time in 24 hrs format")],
			});

		// Fourth: create a schedule from createSchedule() function
		const res =
			(await DBHandler.settings.store(
				interaction.guild.id,
				undefined,
				undefined,
				channelIdU,
				`${mm} ${hh}`,
				ayah_type as Lang
			)) !== false &&
			(await DBHandler.scheduler.init(
				interaction.guild,
				channelIdU,
				`${mm} ${hh} * * *`
			));

		if (res === null)
			return await interaction.editReply({
				embeds: [
					await create_embed(
						"Timezone unconfigured",
						"You have not configured your timezone yet. Configure it with this command: !ayah timezone <your_timezone>",
						colors.error
					),
				],
			});

		if (!res) return await interaction.editReply({ embeds: [embed_error] });

		return await interaction.editReply({
			embeds: [
				await create_embed(
					"Schedules saved",
					`In Shaa Allah, from now on, everyday ayahs will be sent in <#${channelIdU}> at ${time}`,
					colors.success
				),
			],
		});
	},
};
