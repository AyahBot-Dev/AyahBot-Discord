import { Collection } from "discord.js";
import {
  embed_error,
  insufficient_perms,
  create_embed,
  coolDownsEmbed,
} from "../../lib/embeds/embeds";
import { colors } from "../../lib/embeds/infos";
import { handleE } from "../../lib/utils";

import type { Message, PermissionResolvable, TextChannel } from "discord.js";
import type { CustomClient } from "../../lib/classes/CustomClient";

export default async (client: CustomClient, message: Message) => {
  const prefix = message.guild
    ? client.prefixes.cache.get(message.guild.id) || "!ayah "
    : "!ayah ";
  if (!message.content.startsWith(prefix as string) || message.author.bot)
    return;

  const args = await message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = await client.commands.get(cmd);

  try {
    if (command) {
      if (!client.cooldowns.has(command.name))
        client.cooldowns.set(command.name, new Collection());

      const now = Date.now();
      const timestamps = client.cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 3) * 1000;

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
      if (command.guildOnly && message.channel.type === "DM")
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
      if (command.permissions) {
        const authorPerms = (message.channel as TextChannel).permissionsFor(
          message.author
        );
        if (
          !authorPerms ||
          !authorPerms.has(
            command.permissions as unknown as PermissionResolvable
          )
        )
          return await message.reply({
            embeds: [await insufficient_perms(cmd, command.permissions)],
          });
      }
      return await command.execute(message, args, client);
    } else if (!command)
      return await message.reply(`The command \`${cmd}\` is not known to me`);
  } catch (e) {
    await handleE(e, "messageCreate() event");
    return await message.reply({ embeds: [embed_error] });
  }
};
