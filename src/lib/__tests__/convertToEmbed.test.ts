import { jest, describe, it, expect } from "@jest/globals";
import { mocked } from "jest-mock";

import { convertToEmbed } from "../utils";
import { Ayah } from "../classes/Ayah";
import { embed_error } from "../embeds/embeds";
import axios from "../axiosInstance";
import {
	output65,
	output66,
	outputLong,
	outputLong1,
	outputInvalid,
	singleEmbedShort,
	singleEmbedLong,
	multipleEmbedShort,
	multipleEmbedLong,
	ayah404Embed,
	output285,
	output65Arabic,
	singleEmbedArabic,
	output66Arabic,
	outputLong1Arabic,
	outputLongArabic,
	singleEmbedShortMixed,
	multipleEmbedArabic,
	multipleEmbedLongArabic,
	singleEmbedLongMixed,
	multipleEmbedShortMixed,
	multipleEmbedLongMixed,
	singleEmbedLongArabic,
} from "../../helpers/tests/variables";
import { db } from "../initDB";

import type { AxiosResponse } from "axios";

jest.mock("../utils", () => {
	const utils = jest.requireActual("../utils") as object;
	return { ...utils, handleE: jest.fn() };
});
jest.mock("../axiosInstance", () => ({
	get: jest.fn(),
}));

describe("Function: convertToEmbed()", () => {
	const mockedGet = mocked(axios.get);

	it("is returning a correct embed on requesting with a single short ayah", async () => {
		mockedGet.mockResolvedValueOnce({
			data: output65,
			status: 200,
		} as AxiosResponse);

		const embed = await convertToEmbed(await Ayah.fetch("26:65"));
		expect(embed).toEqual(singleEmbedShort);
	});

	it("is returning a correct embed on requesting with a single short ayah with number translation code", async () => {
		mockedGet.mockResolvedValueOnce({
			data: output65,
			status: 200,
		} as AxiosResponse);

		const embed = await convertToEmbed(await Ayah.fetch("26:65", 203));
		expect(embed).toEqual(singleEmbedShort);
	});

	it("is returning a correct embed on requesting with a single long ayah", async () => {
		mockedGet.mockResolvedValueOnce({
			data: outputLong,
			status: 200,
		} as AxiosResponse);

		const embed = await convertToEmbed(await Ayah.fetch("2:282"));
		expect(embed).toEqual(singleEmbedLong);
	});

	it("is returning a correct embed on requesting a short multi-ayah embed", async () => {
		mockedGet
			.mockResolvedValueOnce({
				data: output65,
				status: 200,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: output66,
				status: 200,
			} as AxiosResponse);

		const embed = await convertToEmbed(await Ayah.fetch("26:65-66"));
		expect(embed).toEqual(multipleEmbedShort);
	});

	it("is returning a correct embed on requesting a long multi-ayah embed", async () => {
		mockedGet
			.mockResolvedValueOnce({
				data: outputLong,
				status: 200,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: outputLong1,
				status: 200,
			} as AxiosResponse);

		const embed = await convertToEmbed(await Ayah.fetch("2:282-283"));
		expect(embed).toEqual(multipleEmbedLong);
	});

	it("is returning a correct embed on requesting with a single short arabic ayah", async () => {
		mockedGet.mockResolvedValueOnce({
			data: output65Arabic,
			status: 200,
		} as AxiosResponse);

		const embed = await convertToEmbed(
			await Ayah.fetch("26:65", undefined, "ar")
		);
		expect(embed).toEqual(singleEmbedArabic);
	});

	it("is returning a correct embed on requesting with a single long arabic ayah", async () => {
		mockedGet.mockResolvedValueOnce({
			data: outputLongArabic,
			status: 200,
		} as AxiosResponse);

		const embed = await convertToEmbed(
			await Ayah.fetch("2:282", undefined, "ar")
		);
		expect(embed).toEqual(singleEmbedLongArabic);
	});

	it("is returning a correct embed on requesting a short arabic multi-ayah embed", async () => {
		mockedGet
			.mockResolvedValueOnce({
				data: output65Arabic,
				status: 200,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: output66Arabic,
				status: 200,
			} as AxiosResponse);

		const embed = await convertToEmbed(
			await Ayah.fetch("26:65-66", undefined, "ar")
		);
		expect(embed).toEqual(multipleEmbedArabic);
	});

	it("is returning a correct embed on requesting a long arabic multi-ayah embed", async () => {
		mockedGet
			.mockResolvedValueOnce({
				data: outputLongArabic,
				status: 200,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: outputLong1Arabic,
				status: 200,
			} as AxiosResponse);

		const embed = await convertToEmbed(
			await Ayah.fetch("2:282-283", undefined, "ar")
		);
		expect(embed).toEqual(multipleEmbedLongArabic);
	});

	it("is returning a correct embed on requesting with a single short mixed ayah", async () => {
		mockedGet
			.mockResolvedValueOnce({
				data: output65Arabic,
				status: 200,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: output65,
				status: 200,
			} as AxiosResponse);

		const embed = await convertToEmbed(
			await Ayah.fetch("26:65", undefined, "mixed")
		);
		expect(embed).toEqual(singleEmbedShortMixed);
	});

	it("is returning a correct embed on requesting with a single short mixed ayah with number translation code", async () => {
		mockedGet
			.mockResolvedValueOnce({
				data: output65Arabic,
				status: 200,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: output65,
				status: 200,
			} as AxiosResponse);

		const embed = await convertToEmbed(await Ayah.fetch("26:65", 203, "mixed"));
		expect(embed).toEqual(singleEmbedShortMixed);
	});

	it("is returning a correct embed on requesting with a single long mixed ayah", async () => {
		mockedGet
			.mockResolvedValueOnce({
				data: outputLongArabic,
				status: 200,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: outputLong,
				status: 200,
			} as AxiosResponse);

		const embed = await convertToEmbed(
			await Ayah.fetch("2:282", undefined, "mixed")
		);
		expect(embed).toEqual(singleEmbedLongMixed);
	});

	it("is returning a correct embed on requesting a short mixed multi-ayah embed", async () => {
		mockedGet
			.mockResolvedValueOnce({
				data: output65Arabic,
				status: 200,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: output65,
				status: 200,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: output66Arabic,
				status: 200,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: output66,
				status: 200,
			} as AxiosResponse);

		const embed = await convertToEmbed(
			await Ayah.fetch("26:65-66", undefined, "mixed")
		);
		expect(embed).toEqual(multipleEmbedShortMixed);
	});

	it("is returning a correct embed on requesting a long mixed multi-ayah embed", async () => {
		mockedGet
			.mockResolvedValueOnce({
				data: outputLongArabic,
				status: 200,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: outputLong,
				status: 200,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: outputLong1Arabic,
				status: 200,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: outputLong1,
				status: 200,
			} as AxiosResponse);

		const embed = await convertToEmbed(
			await Ayah.fetch("2:282-283", undefined, "mixed")
		);
		expect(embed).toEqual(multipleEmbedLongMixed);
	});

	it("is returning 404 embed if the ayah wasn't found", async () => {
		mockedGet.mockResolvedValue({
			data: outputInvalid,
			status: 404,
		} as AxiosResponse);

		const embed = await convertToEmbed(await Ayah.fetch("23:234"));
		expect(embed).toEqual(ayah404Embed);
	});

	it("is returning 404 embed if any ayah of the requested ayahs wasn't found", async () => {
		mockedGet.mockResolvedValue({
			data: outputInvalid,
			status: 404,
		} as AxiosResponse);

		const embed = await convertToEmbed(await Ayah.fetch("2:287-288"));
		expect(embed).toEqual(ayah404Embed);
	});

	it("is returning server error embed on internal problems", async () => {
		mockedGet.mockRejectedValue("");

		const embed = await convertToEmbed(await Ayah.fetch("23:234"));
		expect(embed).toEqual(embed_error);
	});

	it("is returning server error embed on internal problems", async () => {
		mockedGet
			.mockResolvedValueOnce({ data: output285, status: 200 } as AxiosResponse)
			.mockRejectedValueOnce("");

		const embed = await convertToEmbed(await Ayah.fetch("2:285-286"));
		expect(embed).toEqual(embed_error);
	});

	// Failing to test catch() statement
	/* it("is handling errors and sending error embed", async () => {
    mockedGet.mockResolvedValue({ data: outputInvalid } as AxiosResponse);
    mockedArray.mockRejectedValue(new Error("") as never);
    const mockedEHandler = mocked(handleE);

    mockedEHandler.mockResolvedValue(true);

    const embed = await convertToEmbed(await Ayah.fetch("26:456"));
    expect(embed).toEqual(embed_error);

    mockedArray.mockRestore();
    mockedEHandler.mockRestore();
  }); */

	db.goOffline();
});
