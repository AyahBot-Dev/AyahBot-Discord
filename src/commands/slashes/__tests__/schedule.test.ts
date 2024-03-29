import { jest, describe, it, expect } from "@jest/globals";
import { mocked } from "jest-mock";

import { guildDFactory, msg } from "../../../helpers/tests/variables";
import {
	create_embed,
	embed_error,
	invalid_datatype,
	syntax_error,
} from "../../../lib/embeds/embeds";
import { colors } from "../../../lib/embeds/infos";
import { db, scheduledJobs } from "../../../lib/initDB";

import scheduleCmd from "../schedule";

import type { CacheType, CommandInteractionOption } from "discord.js";

jest.mock("../../../lib/initDB", () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const db = jest.requireActual("../../../lib/initDB") as any;
	return {
		__esModule: true,
		...db,
		scheduledJobs: {
			...db.scheduledJobs,
			child: jest.fn().mockReturnThis(),
			once: jest.fn(),
			update: jest.fn().mockReturnThis(),
			remove: jest.fn().mockReturnThis(),
		},
	};
});

jest.mock("../../../lib/utils", () => {
	const utils = jest.requireActual("../../../lib/utils") as object;
	return {
		__esModule: true,
		...utils,
		handleE: jest.fn(),
		task: jest.fn(),
	};
});

describe("Command: schedule", () => {
	const mockedJobs = mocked(scheduledJobs);

	it("is successfully scheduling daily ayah in slashes", async () => {
		const data = await guildDFactory(false, true, true, true, true);

		mockedJobs.once.mockResolvedValue(data);
		mockedJobs.update.mockResolvedValue();

		await scheduleCmd.execute(msg, [
			{ value: "123456789012" },
			{ value: "00:00" },
			{ value: "en" },
		] as CommandInteractionOption<CacheType>[]);
		expect(msg.editReply).toBeCalledWith({
			embeds: [
				await create_embed(
					"Schedules saved",
					"In Shaa Allah, from now on, everyday ayahs will be sent in <#123456789012> at 00:00",
					colors.success
				),
			],
		});
	});

	it("is returning datatype embed if ayah_type is not in correct format", async () => {
		await scheduleCmd.execute(msg, [
			{ value: "123456789012" },
			{ value: "00:00" },
			{ value: "blah" },
		] as CommandInteractionOption<CacheType>[]);
		expect(msg.editReply).toBeCalledWith({
			embeds: [await invalid_datatype("blah", "any of 'en', 'ar' and 'mixed'")],
		});
	});

	it("is returning syntax error embed if channelId or time is not in correct format", async () => {
		await scheduleCmd.execute(msg, [
			{ value: "invalidId" },
			{ value: "00:00" },
			{ value: "en" },
		] as CommandInteractionOption<CacheType>[]);
		expect(msg.editReply).toBeCalledWith({
			embeds: [
				await create_embed(
					"Channel not found",
					`The channel <#invalidId> doesn't exist. Maybe forgot to create that?`,
					colors.error
				),
			],
		});
	});

	it("is returning channel not found embed if channel doesn't exist", async () => {
		await scheduleCmd.execute(msg, [
			{ value: "123456789021" },
			{ value: "00:00" },
			{ value: "en" },
		] as CommandInteractionOption<CacheType>[]);
		expect(msg.editReply).toBeCalledWith({
			embeds: [
				await create_embed(
					"Channel not found",
					"The channel <#123456789021> doesn't exist. Maybe forgot to create that?",
					colors.error
				),
			],
		});
	});

	it("is returning not enough perms for some channels", async () => {
		await scheduleCmd.execute(msg, [
			{ value: "123456789010" },
			{ value: "00:00" },
			{ value: "en" },
		] as CommandInteractionOption<CacheType>[]);
		expect(msg.editReply).toBeCalledWith({
			embeds: [
				await create_embed(
					"Insufficient permission I have",
					"I don't have permission to view, send messages \nand send embeds in <#123456789010>. I at least need permissions to view the channel, send embeds and messages",
					colors.warning
				),
			],
		});
	});
	it("is returning channel not a text channel", async () => {
		await scheduleCmd.execute(msg, [
			{ value: "12345678901" },
			{ value: "00:00" },
			{ value: "en" },
		] as CommandInteractionOption<CacheType>[]);

		expect(msg.editReply).toBeCalledWith({
			embeds: [
				await create_embed(
					"Only Text channels supported",
					"I can't send messages and embeds in <#12345678901> as it's not a text channel",
					colors.warning
				),
			],
		});
	});

	it("is returning invalid time error", async () => {
		await scheduleCmd.execute(msg, [
			{ value: "123456789012" },
			{ value: "24:60" },
			{ value: "en" },
		] as CommandInteractionOption<CacheType>[]);
		expect(msg.editReply).toBeCalledWith({
			embeds: [
				await invalid_datatype("24:60", "a valid time in 24 hrs format"),
			],
		});
	});

	it("is returning error embed if storing gets failed", async () => {
		mockedJobs.update.mockRejectedValue("");

		await scheduleCmd.execute(msg, [
			{ value: "123456789012" },
			{ value: "00:00" },
			{ value: "en" },
		] as CommandInteractionOption<CacheType>[]);
		expect(msg.editReply).toBeCalledWith({
			embeds: [embed_error],
		});
	});

	it("is returning timezone unconfigured error", async () => {
		const data = await guildDFactory(false, true);

		mockedJobs.once.mockResolvedValue(data);
		mockedJobs.update.mockResolvedValue();

		await scheduleCmd.execute(msg, [
			{ value: "123456789012" },
			{ value: "00:00" },
			{ value: "en" },
		] as CommandInteractionOption<CacheType>[]);
		expect(msg.editReply).toBeCalledWith({
			embeds: [
				await create_embed(
					"Timezone unconfigured",
					"You have not configured your timezone yet. Configure it with this command: !ayah timezone <your_timezone>",
					colors.error
				),
			],
		});
	});

	it("is returning error embed if there is any problem in DBHandler.scheduler.init() function", async () => {
		mockedJobs.once.mockRejectedValue("");

		await scheduleCmd.execute(msg, [
			{ value: "123456789012" },
			{ value: "00:00" },
			{ value: "en" },
		] as CommandInteractionOption<CacheType>[]);
		expect(msg.editReply).toBeCalledWith({
			embeds: [embed_error],
		});
	});

	db.goOffline();
});
