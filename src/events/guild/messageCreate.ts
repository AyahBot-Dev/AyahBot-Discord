import { APIEmbed, ChannelType, Collection } from "discord.js";

import {
	embed_error,
	create_embed,
	coolDownsEmbed,
} from "../../lib/embeds/embeds";
import { colors } from "../../lib/embeds/infos";
import { handleE } from "../../lib/utils";

import type { Message } from "discord.js";
import type { CustomClient } from "../../lib/classes/CustomClient";

export default async (client: CustomClient, message: Message) => {
	const prefix = message.guild
		? client.prefixes.cache.get(message.guild.id) || "!ayah "
		: "!ayah ";
	if (!message.content.startsWith(prefix as string) || message.author.bot)
		return;

	const args = await message.content.slice(prefix.length).trim().split(/ +/);

	const cmd = args.shift().toLowerCase();

	const command = await client.commands.get(cmd);

	try {
		if (command) {
			if (!client.cooldowns.has(command.name))
				client.cooldowns.set(command.name, new Collection());

			const now = Date.now();
			const timestamps = client.cooldowns.get(command.name);
			const cooldownAmount = 60 * 1000;

			if (timestamps.has(parseInt(message.author.id))) {
				const expirationTime =
					timestamps.get(parseInt(message.author.id)) + cooldownAmount;

				if (now < expirationTime) {
					return message.reply({ embeds: [coolDownsEmbed] });
				}
			}

			timestamps.set(parseInt(message.author.id), now);
			setTimeout(
				() => timestamps.delete(parseInt(message.author.id)),
				cooldownAmount
			);
			if (command.guildOnly && message.channel.type === ChannelType.DM)
				return await message.reply({
					embeds: [
						await create_embed(
							"Not a DM command",
							`The command \`${cmd}\` is not a DM command`,
							colors.warning
						),
					],
				});

			if (command.ownerOnly && message.author.id != process.env.OWNER_ID)
				return await message.reply({
					embeds: [
						await create_embed(
							"Moderation Command",
							`The command \`${cmd}\` is a moderation command only usable by AyahBot staffs`,
							colors.warning
						),
					],
				});

			const depricationEmbed = {
				color: colors.info,
				description: `Discord bots are moving to slash commands. Try using /${command.name} instead.\n\nAyahbot has started to deprecate message commands and has full support for slash commands and interactions.`,
			} as APIEmbed;
			return await message.reply({ embeds: [depricationEmbed] });
		} else if (!command)
			return await message.reply(`The command \`${cmd}\` is not known to me`);
	} catch (e) {
		await handleE(e, "messageCreate() event");
		return await message.reply({ embeds: [embed_error] });
	}
};
