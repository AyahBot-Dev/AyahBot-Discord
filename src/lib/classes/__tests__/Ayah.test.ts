import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { mocked } from "jest-mock";
import axios from "../../axiosInstance";

import { Ayah } from "../Ayah";
import {
  data65,
  dataInvalid,
  dataError,
  output65,
  output66,
  outputInvalid,
  output65Arabic,
  output66Arabic,
  data65Arabic,
} from "../../../helpers/tests/variables";

import type { AxiosResponse } from "axios";

jest.mock("../../axiosInstance", () => ({
  get: jest.fn(),
}));
jest.mock("../../utils", () => ({
  handleE: jest.fn(),
}));

describe("Class: Ayah", () => {
  const mockedGet = mocked(axios.get);

  it("is not returning falsy values on calling getters", async () => {
    mockedGet
      .mockResolvedValueOnce({
        data: output65Arabic,
        status: 200,
      } as AxiosResponse)
      .mockResolvedValueOnce({
        data: output65,
        status: 200,
      } as AxiosResponse);

    const ayah = (await Ayah.fetch(
      data65.verse_key,
      "hilali",
      "mixed"
    )) as Ayah;
    expect(ayah.code).toBeTruthy();
    expect(ayah.verse_key).toBeTruthy();
    expect(ayah.translation).toBeTruthy();
    expect(ayah.lang).toBeTruthy();
    expect(ayah.verse).toBeTruthy();
    expect(ayah.verse_translated).toBeTruthy();
    expect(ayah.surah).toBeTruthy();
    expect(ayah.translator).toBeTruthy();
  });

  describe("Function: fetch()", () => {
    it("is returning single ayah from verse_key when lang is 'en'", async () => {
      mockedGet.mockResolvedValue({
        data: output65,
        status: 200,
      } as AxiosResponse);

      const ayah = (await Ayah.fetch(data65.verse_key)) as Ayah;
      expect(mockedGet).toHaveBeenCalledTimes(1);
      expect(mockedGet).toHaveBeenCalledWith(
        "https://api.qurancdn.com/api/qdc/verses/by_key/26:65?translations=203&translation_fields=resource_name&fields=chapter_id"
      );
      const res = await ayah.exportData();
      expect(res).toEqual(data65);
    });

    it("is returning single ayah from verse_key when arabic scripts are present", async () => {
      mockedGet.mockResolvedValue({
        data: output65Arabic,
        status: 200,
      } as AxiosResponse);

      const ayah = (await Ayah.fetch(
        data65.verse_key,
        undefined,
        "ar"
      )) as Ayah;
      expect(mockedGet).toHaveBeenCalledTimes(1);
      expect(mockedGet).toHaveBeenCalledWith(
        "https://api.qurancdn.com/api/qdc/quran/verses/uthmani?verse_key=26:65"
      );
      const res = await ayah.exportData();
      expect(res).toEqual(data65Arabic);
    });

    it("is returning multiple verse on ranged ayah key", async () => {
      mockedGet
        .mockResolvedValueOnce({
          data: output65,
          status: 200,
        } as AxiosResponse)
        .mockResolvedValueOnce({
          data: output66,
          status: 200,
        } as AxiosResponse);

      const ayah = (await Ayah.fetch("26:65-66")) as Ayah[];
      expect(mockedGet).toHaveBeenCalledTimes(2);
      expect(mockedGet).toHaveBeenNthCalledWith(
        1,
        "https://api.qurancdn.com/api/qdc/verses/by_key/26:65?translations=203&translation_fields=resource_name&fields=chapter_id"
      );
      expect(mockedGet).toHaveBeenLastCalledWith(
        "https://api.qurancdn.com/api/qdc/verses/by_key/26:66?translations=203&translation_fields=resource_name&fields=chapter_id"
      );
      expect(ayah).toContainEqual(expect.any(Ayah));
    });

    it("is returning multiple verse on ranged ayah key when arabicScr is present", async () => {
      mockedGet
        .mockResolvedValueOnce({
          data: output65Arabic,
          status: 200,
        } as AxiosResponse)
        .mockResolvedValueOnce({
          data: output66Arabic,
          status: 200,
        } as AxiosResponse);

      const ayah = (await Ayah.fetch("26:65-66", undefined, "ar")) as Ayah[];
      expect(mockedGet).toHaveBeenCalledTimes(2);
      expect(mockedGet).toHaveBeenNthCalledWith(
        1,
        "https://api.qurancdn.com/api/qdc/quran/verses/uthmani?verse_key=26:65"
      );
      expect(mockedGet).toHaveBeenLastCalledWith(
        "https://api.qurancdn.com/api/qdc/quran/verses/uthmani?verse_key=26:66"
      );
      expect(ayah).toContainEqual(expect.any(Ayah));
    });

    it("is returning 'Not Found' if verse_key doesn't exist", async () => {
      mockedGet.mockResolvedValue({
        data: outputInvalid,
        status: 404,
      } as AxiosResponse);

      const ayah = (await Ayah.fetch("23:234")) as Ayah;
      expect(mockedGet).toHaveBeenCalledTimes(1);
      expect(mockedGet).toHaveBeenCalledWith(
        "https://api.qurancdn.com/api/qdc/verses/by_key/23:234?translations=203&translation_fields=resource_name&fields=chapter_id"
      );
      const res = await ayah.exportData();
      expect(res).toEqual(dataInvalid);
    });

    it("is showing errors correctly in verse_key fetch", async () => {
      mockedGet.mockRejectedValue("");

      const ayah = (await Ayah.fetch("23:234")) as Ayah;
      expect(mockedGet).toHaveBeenCalledTimes(1);
      expect(mockedGet).toHaveBeenCalledWith(
        "https://api.qurancdn.com/api/qdc/verses/by_key/23:234?translations=203&translation_fields=resource_name&fields=chapter_id"
      );
      const res = await ayah.exportData();
      expect(res).toEqual(dataError);
    });
  });

  describe("Function: random()", () => {
    const spy = jest.spyOn(Math, "floor");

    beforeEach(jest.resetAllMocks as unknown as () => void);

    afterAll(jest.resetAllMocks as unknown as () => void);

    it("is requesting for a random ayah everytime", async () => {
      mockedGet.mockResolvedValue({
        data: output65,
        status: 200,
      } as AxiosResponse);
      spy.mockReturnValueOnce(26);
      spy.mockReturnValueOnce(65);

      await Ayah.random();

      expect(spy).toBeCalledTimes(2);
    });

    it("is requesting for a random daily ayah everytime", async () => {
      mockedGet.mockResolvedValue({
        data: output65,
        status: 200,
      } as AxiosResponse);
      spy.mockReturnValueOnce(26);
      spy.mockReturnValueOnce(65);

      const ayah = await (
        await Ayah.random(undefined, true)
      ).exportDataForEmbed();

      expect(spy).toBeCalledTimes(2);

      expect(ayah.title).toEqual("Ayah of the day");
    });

    it("is requesting for a random daily ayah everytime when lang is mixed", async () => {
      mockedGet
        .mockResolvedValueOnce({
          data: output65Arabic,
          status: 200,
        } as AxiosResponse)
        .mockResolvedValueOnce({
          data: output65,
          status: 200,
        } as AxiosResponse);
      spy.mockReturnValueOnce(26);
      spy.mockReturnValueOnce(65);

      const ayah = await (
        await Ayah.random(undefined, true, "mixed")
      ).exportDataForEmbed();

      expect(spy).toBeCalledTimes(2);

      expect(ayah.title).toEqual("Ayah of the day");
    });

    it("is requesting for a random daily ayah everytime when arabicScr is set", async () => {
      mockedGet.mockResolvedValue({
        data: output65Arabic,
        status: 200,
      } as AxiosResponse);
      spy.mockReturnValueOnce(26);
      spy.mockReturnValueOnce(65);

      const ayah = await (
        await Ayah.random(undefined, true, "ar")
      ).exportDataForEmbed();

      expect(spy).toBeCalledTimes(2);

      expect(ayah.title).toEqual("آية اليوم");
    });
  });
});
