import { ChannelType, EmbedBuilder } from "discord.js";
import nodemailer from "nodemailer";
import moment from "moment-timezone";
import schedule from "node-schedule";
import levenshtein from "js-levenshtein";

import { Ayah } from "./classes/Ayah";
import { embed_error } from "./embeds/embeds";
import { colors } from "./embeds/infos";
import loadCommands from "./handlers/commandsLoader";
import loadEvents from "./handlers/eventsLoader";
import loadJobs from "./handlers/jobsLoader";
import loadSlashes from "./handlers/slashesLoader";

import type { Guild, EmbedData } from "discord.js";
import type { Database } from "firebase-admin/lib/database/database";

import type { CustomClient } from "./classes/CustomClient";
import type { Lang } from "../types";

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

export const enum errorCodes {
	INVALID_SURAH = 118,
	INVALID_VERSE = 290,
}

export const cleanupAll = (db?: Database, client?: CustomClient) => {
	schedule.gracefulShutdown();

	if (client) {
		// deepcode ignore NoEffectExpression: <No need>
		client.commands.clear();
		client.cooldowns.clear();
		client.helpCommands.clear();
		client.quranTrs.cache.clear();

		client.commands = null;
		client.cooldowns = null;
		client.helpCommands = null;
		client.quranTrs = null;

		client.destroy();
	}

	if (db) db.goOffline();

	process.exit(0);
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
	await loadSlashes(client)
); // TODO: for using when able to clear import cache

/* istanbul ignore next */
export const initJPS = async (client: CustomClient) => (
	await loadJobs(client), await loadSlashes(client)
);

export const findClosestMatchDIST = async (input: string, list: string[]) => {
	const suggestions = [];
	for (let i = 0; i < list.length && suggestions.length < 15; i++) {
		levenshtein(input, list[i]) <= 4 ? suggestions.push(list[i]) : null;
	}
	return suggestions;
};

export const findClosestMatchesBS = async (query: string, arr: string[]) => {
	const results = [];
	let left = 0;
	let right = arr.length - 1;
	while (left <= right && results.length < 5) {
		const mid = Math.floor((left + right) / 2);
		const element = arr[mid];
		if (element.startsWith(query)) {
			results.push(element);
			let i = mid - 1;
			while (i >= 0 && arr[i].startsWith(query) && results.length < 5) {
				results.push(arr[i]);
				i--;
			}
			i = mid + 1;
			while (i < arr.length && arr[i].startsWith(query) && results.length < 5) {
				results.push(arr[i]);
				i++;
			}
			break;
		}
		if (query < element) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}
	return results;
};

/* **FASTEST, but some bugs**
function binarySearch(input, timezoneList){
  const results= [];
  let low = 0;
  let high = timezoneList.length - 1;
  let numResults = 0;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const name = timezoneList[mid];
    
    if (name.includes(input)) {
      results.push(name);
      numResults++;
    }
    
    if (name >= input) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  
  return results;
}
*/

/* same bugs
function binarySearch(input, timezoneList) {
  const results = [];
  let low = 0;
  let high = timezoneList.length - 1;
  let numResults = 0;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const name = timezoneList[mid];
    
    if (name.includes(input)) {
      results.push(name);
      numResults++;
    }
    
    if (name >= input) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }

    if (numResults >= 5) {
      break;
    }
  }
  
  return results;
}*/

// export const transl
