import { jest, describe, it, expect } from "@jest/globals";
import { mocked } from "jest-mock";
import schedule from "node-schedule";

import {
	guildData,
	guildDFactory,
	job,
	msg,
	specSnap,
	tzChngedEmbed,
} from "../../../helpers/tests/variables";
import {
	embed_error,
	invalid_datatype,
	syntax_error,
} from "../../../lib/embeds/embeds";
import { db, scheduledJobs } from "../../../lib/initDB";

import timezoneCmd from "../timezone";

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

describe("Command: timezone", () => {
	const mockedJobs = mocked(scheduledJobs);

	it("is successfully saving timezone data in slash", async () => {
		// No need for testing these objects with every type as they are already tested later
		const data = await guildDFactory(true);

		mockedJobs.update.mockResolvedValue();
		mockedJobs.once.mockResolvedValue(data);

		await timezoneCmd.execute(msg, [
			{ value: "Asia/Dhaka" },
		] as unknown as CommandInteractionOption<CacheType>[]);
		expect(msg.editReply).toBeCalledWith({ embeds: [tzChngedEmbed] });
	});

	it("is successfully saving timezone data when time was already set", async () => {
		schedule.scheduledJobs[guildData._id] = job;

		mockedJobs.update.mockResolvedValue();
		mockedJobs.once.mockResolvedValue(specSnap);

		await timezoneCmd.execute(msg, [
			{ value: "Asia/Dhaka" },
		] as unknown as CommandInteractionOption<CacheType>[]);
		expect(msg.editReply).toBeCalledWith({ embeds: [tzChngedEmbed] });
		expect(job.reschedule).toBeCalled();
		delete schedule.scheduledJobs[guildData._id];
	});

	it("is successfully saving timezone data when time wasn't already set", async () => {
		schedule.scheduledJobs[guildData._id] =
			undefined as unknown as schedule.Job;

		const data = await guildDFactory(true);

		mockedJobs.update.mockResolvedValue();
		mockedJobs.once.mockResolvedValue(data);

		await timezoneCmd.execute(msg, [
			{ value: "Asia/Dhaka" },
		] as unknown as CommandInteractionOption<CacheType>[]);
		expect(msg.editReply).toBeCalledWith({ embeds: [tzChngedEmbed] });
	});

	it("is returning syntax error embed if timezone is not given", async () => {
		await timezoneCmd.execute(msg, []);
		expect(msg.editReply).toBeCalledWith({
			embeds: [await syntax_error("<timezone (e.g. Asia/Dhaka)>")],
		});
	});

	it("is returning datatype error if timezone is not valid", async () => {
		await timezoneCmd.execute(msg, [
			{ value: "blah" },
		] as unknown as CommandInteractionOption<CacheType>[]);
		expect(msg.editReply).toBeCalledWith({
			embeds: [
				await invalid_datatype(
					"blah",
					"a valid timezone listed [here](https://github.com/AyahBot-Dev/AyahBot-Discord/wiki/Timezones)"
				),
			],
		});
	});

	it("is returning error embed if storing gets failed", async () => {
		mockedJobs.update.mockRejectedValue("");

		await timezoneCmd.execute(msg, [
			{ value: "Asia/Dhaka" },
		] as unknown as CommandInteractionOption<CacheType>[]);
		expect(msg.editReply).toBeCalledWith({ embeds: [embed_error] });
	});

	db.goOffline();
});
