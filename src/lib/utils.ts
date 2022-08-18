import { ChannelType, EmbedBuilder } from "discord.js";
import nodemailer from "nodemailer";
import moment from "moment-timezone";

import { Ayah } from "./classes/Ayah";
import { embed_error } from "./embeds/embeds";
import { colors } from "./embeds/infos";
import loadCommands from "./handlers/commandsLoader";
import loadEvents from "./handlers/eventsLoader";
import loadJobs from "./handlers/jobsLoader";
import loadPrefixes from "./handlers/prefixesLoader";
import loadSlashes from "./handlers/slashesLoader";

import type { Guild, EmbedData } from "discord.js";

import type { CustomClient } from "./classes/CustomClient";
import { Lang } from "../types";

export const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

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
): Promise<EmbedBuilder> => {
  try {
    const data: EmbedData = {
      color: colors.success,
      fields: [],
    };
    if (Array.isArray(obj)) {
      /*
      for (const v of obj) {
        const objData = await v.exportDataForEmbed();
        if (!objData.description) {
          data.fields.push(objData.field);
        } else if (objData.description == "SERVER_ERR") {
          return embed_error;
        } else {
          continue;
        }
        /* istanbul ignore next
        if (objData.color) data.color = objData.color;
        data.title = objData.title;
        data.footer = objData.footer;
      }
      if (data.fields.length < 1) {
        data.color = colors.warning;
        data.title = "Not found";
        data.description = "The ayah(s) you requested doesn't exist";
        data.footer = undefined;
      } 
      */
      for (const v of obj) {
        const objData = await v.exportDataForEmbed();
        if (!objData.description) {
          for (const i of objData.fields) {
            if (i) data.fields.push(i);
          }
        } else if (objData.description == "SERVER_ERR") {
          return embed_error;
        } else continue;

        /* istanbul ignore next */
        if (objData.color) data.color = objData.color;
        data.title = objData.title;
        data.footer = objData.footer;
      }

      // already did ayah existence checking in Ayah.fetch()
      if (data.fields.length < 1) {
        data.color = colors.warning;
        data.title = "Not found";
        data.description = "The ayah(s) you requested doesn't exist";
        data.footer = undefined;
      }
    } else {
      const objData = await obj.exportDataForEmbed();
      if (!objData.description) {
        for (const i of objData.fields) {
          if (i) data.fields.push(i);
        }
      } else if (objData.description == "SERVER_ERR") {
        return embed_error;
      } else {
        data.description = objData.description;
      }
      if (objData.color) data.color = objData.color;
      data.title = objData.title;
      data.footer = objData.footer;
    }
    return new EmbedBuilder(data);
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
export const task = async (
  quran: number,
  lang: Lang,
  guild: Guild,
  channel: string
) => {
  /* istanbul ignore next */
  try {
    const channelObj = await guild.channels.cache.get(channel);
    const hasPerms = await guild.members.me
      .permissionsIn(channelObj)
      .has(["SendMessages", "ViewChannel", "EmbedLinks"]);

    if (!channelObj || channelObj.type != ChannelType.GuildText || !hasPerms) {
      return;
    }
    const ayah_embed = await convertToEmbed(
      await Ayah.random(quran, true, lang)
    );
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
