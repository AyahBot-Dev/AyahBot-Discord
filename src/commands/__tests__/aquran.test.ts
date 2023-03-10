import { jest, describe, it, expect } from "@jest/globals";
import { mocked } from "jest-mock";

import axios from "../../lib/axiosInstance";
import {
	msg,
	multipleEmbedArabic,
	output65Arabic,
	output66Arabic,
	singleEmbedArabic,
} from "../../helpers/tests/variables";
import { invalid_datatype, syntax_error } from "../../lib/embeds/embeds";
import { db } from "../../lib/initDB";

import aquranCmd from "../aquran";

import type { CacheType, CommandInteractionOption } from "discord.js";
import type { AxiosResponse } from "axios";

jest.mock("../../lib/axiosInstance", () => ({
	get: jest.fn(),
}));

jest.mock("../../lib/utils", () => {
	const utils = jest.requireActual("../../lib/utils") as object;
	return { __esModule: true, ...utils, handleE: jest.fn() };
});

describe("Command: aquran", () => {
	const mockedGet = mocked(axios.get);

	it("is returning single ayah correctly in slash command if verse_key given", async () => {
		mockedGet.mockResolvedValue({
			data: output65Arabic,
			status: 200,
		} as AxiosResponse);

		await aquranCmd.execute(msg, [
			{ value: "26:65" },
		] as unknown as CommandInteractionOption<CacheType>[]);

		expect(msg.editReply).toBeCalledTimes(1);
		expect(msg.editReply).toBeCalledWith({ embeds: [singleEmbedArabic] });
	});

	it("is returning multiple ayahs on requesting multiple ayahs", async () => {
		mockedGet
			.mockResolvedValueOnce({
				data: output65Arabic,
				status: 200,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: output66Arabic,
				status: 200,
			} as AxiosResponse);

		await aquranCmd.execute(msg, [
			{ value: "26:65-66" },
		] as unknown as CommandInteractionOption<CacheType>[]);

		expect(msg.editReply).toBeCalledTimes(1);
		expect(msg.editReply).toBeCalledWith({ embeds: [multipleEmbedArabic] });
	});

	it("is returning syntax error on falsy verse_key", async () => {
		await aquranCmd.execute(msg, []);

		expect(msg.editReply).toBeCalledTimes(1);
		expect(msg.editReply).toBeCalledWith({
			embeds: [await syntax_error("<verse_key (e.g. 3:157 or 3:100-105)>")],
		});
	});

	it("is returning datatype error on invalid verse_key", async () => {
		await aquranCmd.execute(msg, [
			{ value: "26" },
		] as unknown as CommandInteractionOption<CacheType>[]);

		expect(msg.editReply).toBeCalledTimes(1);
		expect(msg.editReply).toBeCalledWith({
			embeds: [await invalid_datatype("26", "a valid verse key")],
		});
	});

	db.goOffline();
});
