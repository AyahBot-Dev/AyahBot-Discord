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
  output286,
  multipleEmbed404Last,
  output1,
  multipleEmbed404First,
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
    mockedGet.mockResolvedValue({
      data: output65,
      status: 200,
    } as AxiosResponse);

    const embed = await convertToEmbed(await Ayah.fetch("26:65"));
    expect(embed).toEqual(singleEmbedShort);
  });

  it("is returning a correct embed on requesting with a single short ayah with number translation code", async () => {
    mockedGet.mockResolvedValue({
      data: output65,
      status: 200,
    } as AxiosResponse);

    const embed = await convertToEmbed(await Ayah.fetch("26:65", 203));
    expect(embed).toEqual(singleEmbedShort);
  });

  it("is returning a correct embed on requesting with a single long ayah", async () => {
    mockedGet.mockResolvedValue({
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

  it("is returning a correct embed if some last ayah doesn't exist on requested ayahs", async () => {
    mockedGet
      .mockResolvedValueOnce({
        data: output285,
        status: 200,
      } as AxiosResponse)
      .mockResolvedValueOnce({
        data: output286,
        status: 200,
      } as AxiosResponse)
      .mockResolvedValue({
        data: outputInvalid,
        status: 404,
      } as AxiosResponse);

    const embed = await convertToEmbed(await Ayah.fetch("2:285-287"));
    expect(embed).toEqual(multipleEmbed404Last);
  });

  it("is returning a correct embed if some first ayah doesn't exist on requested ayahs", async () => {
    mockedGet.mockResolvedValue({
      data: output1,
      status: 200,
    } as AxiosResponse);

    const embed = await convertToEmbed(await Ayah.fetch("1:0-1"));
    expect(embed).toEqual(multipleEmbed404First);
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
