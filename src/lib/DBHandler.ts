import schedule from "node-schedule";

import { scheduledJobs } from "./initDB";
import { cronTZ, handleE, task } from "./utils";
import { translations, translationsR } from "./classes/Ayah";

import type { Guild } from "discord.js";
import { DataDeletable, Lang } from "../types";

export default {
	settings: {
		fetch: async (guildId: string) => {
			try {
				const data = await scheduledJobs.child(guildId).once("value");
				const dataVal = (await data.val()) || {};
				let time: string, channelStr: string;
				const { quran, lang, channel, spec, timezone } = dataVal;
				if (channel && spec) {
					channelStr = `<#${channel}>`;
					const [mm, hh] = String(spec).split(" ");
					time = hh + ":" + mm.padStart(2, "0");
				} else {
					channelStr = "Not set";
					time = "Not set";
				}

				const dataObj = {
					"Quran Translation": translationsR[quran] || "hilali",
					Showing:
						lang == "en"
							? "Translation only"
							: lang == "ar"
							? "Arabic only"
							: lang
							? "Both translations and arabic"
							: "Not set",
					Channel: channelStr,
					Time: time,
					Timezone: timezone || "Not set",
				};
				return dataObj;
			} catch (e) {
				await handleE(e, "settings.fetch()");
				return;
			}
		},

		fetchRaw: async (guildId: string) => {
			try {
				return await (await scheduledJobs.child(guildId).once("value")).val();
			} catch (e) {
				await handleE(e, "settings.fetchRaw()");
				return;
			}
		},

		fetchAll: async () => {
			try {
				return await (await scheduledJobs.once("value")).val();
			} catch (e) {
				await handleE(e, "settings.fetchAll()");
				return;
			}
		},

		remove: async (guildId: string, ...items: DataDeletable[]) => {
			try {
				const dTU = {};
				for (let i = 0; i < items.length; i++) dTU[items[i]] = null;
				return await scheduledJobs.child(guildId).update(dTU);
			} catch (e) {
				await handleE(e, `settings.remove(${items?.join(", ")})`);
				return false;
			}
		},

		store: async (
			guildId: string,
			quran?: string,
			timezone?: string,
			channel?: string,
			spec?: string,
			lang?: Lang
		) => {
			try {
				// add to db
				const dTS = {
					_id: guildId,
					quran: translations[quran],
					lang,
					channel,
					spec,
					timezone,
				};
				Object.keys(dTS).forEach((k) => !dTS[k] && delete dTS[k]);
				return await scheduledJobs.child(guildId).update(dTS);
			} catch (e) {
				await handleE(e, "settings.store()");
				return false;
			}
		},

		removeGuild: async (guildId: string) => {
			try {
				return await scheduledJobs.child(guildId).remove();
			} catch (e) {
				await handleE(e, "settings.removeGuild()");
				return false;
			}
		},
	},

	scheduler: {
		init: async (guild: Guild, channel: string, spec: string) => {
			try {
				const { quran, lang, timezone } = await (
					await scheduledJobs.child(guild.id).once("value")
				).val();

				if (!timezone) {
					return null;
				}

				const _spec = await cronTZ(timezone, spec);

				if (schedule.scheduledJobs[guild.id]) {
					schedule.scheduledJobs[guild.id].cancel();
				}

				// do the rest
				schedule.scheduleJob(
					guild.id,
					_spec,
					/* istanbul ignore next */
					await task.bind(null, quran, lang, guild, channel)
				);
				return true;
			} catch (e) {
				await handleE(e, "scheduler.init()");
				return;
			}
		},

		updateTZ: async (guildId: string, timezone: string) => {
			try {
				const spec = await (
					await scheduledJobs.child(`${guildId}/spec`).once("value")
				).val();

				if (!spec || !schedule.scheduledJobs[guildId]) return null;

				const _spec = await cronTZ(timezone, spec);

				if (schedule.scheduledJobs[guildId]) {
					schedule.scheduledJobs[guildId].reschedule(_spec);
				}

				return true;
			} catch (e) {
				await handleE(e, "scheduler.updateTZ()");
				return;
			}
		},
	},
};
