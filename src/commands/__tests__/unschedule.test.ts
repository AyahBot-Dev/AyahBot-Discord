import { jest, describe, it, expect } from "@jest/globals";
import { mocked } from "jest-mock";
import schedule from "node-schedule";

import {
	guildData,
	guildDFactory,
	job,
	msg,
	unscheduledEmbed,
	scheduleNotDoneEmbed,
} from "../../helpers/tests/variables";
import { embed_error } from "../../lib/embeds/embeds";
import { db, scheduledJobs } from "../../lib/initDB";

import unscheduleCmd from "../unschedule";

jest.mock("../../lib/initDB", () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const db = jest.requireActual("../../lib/initDB") as any;
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

jest.mock("../../lib/utils", () => {
	const utils = jest.requireActual("../../lib/utils") as object;
	return {
		__esModule: true,
		...utils,
		handleE: jest.fn(),
		task: jest.fn(),
	};
});

describe("Command: unschedule", () => {
	const mockedJobs = mocked(scheduledJobs);

	it("is successfully removing data and schedules", async () => {
		const data = await guildDFactory(false, true, true, true, true, true);
		schedule.scheduledJobs[guildData._id] = job;

		mockedJobs.update.mockResolvedValue();
		mockedJobs.once.mockResolvedValue(data);

		await unscheduleCmd.execute(msg);
		expect(job.cancel).toBeCalled();
		expect(msg.reply).toBeCalledWith({ embeds: [unscheduledEmbed] });
	});

	it("is returning error embed removing from database is unsuccessful", async () => {
		mockedJobs.update.mockRejectedValue("");

		await unscheduleCmd.execute(msg);
		expect(msg.reply).toBeCalledWith({
			embeds: [embed_error],
		});
	});

	it("is returning not yet scheduled embed if schedule not yet set", async () => {
		const data = await guildDFactory(true);

		mockedJobs.once.mockResolvedValue(data);

		await unscheduleCmd.execute(msg);
		expect(msg.reply).toBeCalledWith({ embeds: [scheduleNotDoneEmbed] });
	});

	db.goOffline();
});
