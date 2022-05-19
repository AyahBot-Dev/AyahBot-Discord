import { MessageEmbed } from "discord.js";
import nodemailer from "nodemailer";
import moment from "moment-timezone";

import { Ayah } from "./classes/Ayah.js";
import { embed_error } from "./embeds/embeds.js";
import { colors } from "./embeds/infos.js";
import loadCommands from "./handlers/commandsLoader.js";
import loadEvents from "./handlers/eventsLoader.js";
import loadJobs from "./handlers/jobsLoader.js";
import loadPrefixes from "./handlers/prefixesLoader.js";
import loadSlashes from "./handlers/slashesLoader.js";

import type { Guild, MessageEmbedOptions } from "discord.js";

import type { CustomClient } from "./classes/CustomClient.js";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const dateOptions = {
  timeZone: "Asia/Dhaka",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
} as unknown;

export const handleE = async (e: Error, procPath: string): Promise<boolean> => {
  console.error(e);
  const message = {
    from: `AyahBot Mailer <${process.env.SENDER_MAIL}>`,
    to: process.env.RECEIVER_MAIL,
    subject: "Caught a new error",
    text: `Assalamu'alaikum wa rahmatullahi wa barakatuh, dev! Hope you are fine by the grace of Almighty. \nRecently, I have faced some errors while doing ${procPath}. For your conveniance, the error is given below: \n\`\`\`${e.message}\n${e.stack}\`\`\``,
    html: `<p>Assalamu'alaikum wa rahmatullahi wa barakatuh, dev!</p><p>Hope you are fine by the grace of Almighty.</p>\n<p>Recently, I have faced some errors while doing ${procPath}. For your conveniance, the error is given below: </p></br><pre>${e.message}</br>\n${e.stack}</pre>`,
  };
  return await transport
    .sendMail(message)
    .then(async () => {
      return true;
    })
    .catch(async (e: Error) => {
      console.error(e);
      return false;
    });
};

export const convertToEmbed = async (
  obj: Ayah | Ayah[]
): Promise<MessageEmbed> => {
  try {
    const data: MessageEmbedOptions = {
      color: colors.success,
      fields: [],
    };
    if (Array.isArray(obj)) {
      for (const v of obj) {
        const objData = await v.exportDataForEmbed();
        if (!objData.description) {
          data.fields.push(objData.field);
        } else if (objData.description == "SERVER_ERR") {
          return embed_error;
        } else {
          continue;
        }
        /* istanbul ignore next */
        if (objData.color) data.color = objData.color;
        data.title = objData.title;
        data.footer = objData.footer;
      }
      if (data.fields.length < 1) {
        data.color = colors.warning;
        data.title = "Not found";
        data.description = "The ayah (s) you requested doesn't exist";
        data.footer = null;
      }
    } else {
      const objData = await obj.exportDataForEmbed();
      if (!objData.description) {
        data.fields[0] = objData.field;
      } else if (objData.description == "SERVER_ERR") {
        return embed_error;
      } else {
        data.description = objData.description;
      }
      if (objData.color) data.color = objData.color;
      data.title = objData.title;
      data.footer = objData.footer;
    }
    return new MessageEmbed(data);
  } catch (e) /* istanbul ignore next */ {
    await handleE(e, "convertToEmbed()");
    return embed_error;
  }
};

export const cronTZ = (
  tz: string,
  cron: string,
  /* istanbul ignore next */
  toTZ = process.env.TZ || moment.tz.guess()
): Promise<string> =>
  new Promise((resolve) => {
    resolve(moment.tz(cron, "mm HH * * *", tz).tz(toTZ).format("mm HH * * *"));
  });

/* istanbul ignore next */
export const task = async (quran: number, guild: Guild, channel: string) => {
  /* istanbul ignore next */
  try {
    const ayah_embed = await convertToEmbed(await Ayah.random(quran, true));
    const channelObj = await guild.channels.cache.get(channel);
    const hasPerms = await guild.me
      .permissionsIn(channelObj)
      .has(["VIEW_CHANNEL", "EMBED_LINKS", "SEND_MESSAGES"]);

    if (!channelObj || !(channelObj.type == "GUILD_TEXT") || !hasPerms) {
      return;
    }
    return await channelObj.send({ embeds: [ayah_embed] });
  } catch (e) {
    await handleE(e, "task()");
    return;
  }
};

/* istanbul ignore next */
export const init = async (client: CustomClient) => (
  await loadCommands(client),
  await loadEvents(client),
  await loadJobs(client),
  await loadPrefixes(client),
  await loadSlashes(client)
);

/* istanbul ignore next */
export const initJPS = async (client: CustomClient) => (
  await loadJobs(client), await loadPrefixes(client), await loadSlashes(client)
);
