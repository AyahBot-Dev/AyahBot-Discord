import { jest, describe, it, expect } from "@jest/globals";
import { mocked } from "jest-mock";

import axios from "../../lib/axiosInstance";
import {
  clientCU,
  errMsg,
  msg,
  multipleEmbedHaleem,
  multipleEmbedShort,
  output65,
  output65Haleem,
  output66,
  output66Haleem,
  singleEmbedHaleem,
  singleEmbedShort,
} from "../../helpers/tests/variables";
import {
  embed_error,
  invalid_datatype,
  syntax_error,
} from "../../lib/embeds/embeds";
import { db } from "../../lib/initDB";

import quranCmd from "../quran";

import type { CacheType, CommandInteractionOption } from "discord.js";
import type { AxiosResponse } from "axios";

jest.mock("../../lib/axiosInstance", () => ({
  get: jest.fn(),
}));

jest.mock("../../lib/utils", () => {
  const utils = jest.requireActual("../../lib/utils") as object;
  return { __esModule: true, ...utils, handleE: jest.fn() };
});

describe("Command: quran", () => {
  const mockedGet = mocked(axios.get);

  it("is returning single ayah correctly if in slash command and verse_key and translation key both given", async () => {
    mockedGet.mockResolvedValue({
      data: output65Haleem,
      status: 200,
    } as AxiosResponse);

    await quranCmd.execute(
      msg,
      [
        { value: "26:65" },
        { value: "haleem" },
      ] as unknown as CommandInteractionOption<CacheType>[],
      clientCU
    );
    expect(msg.channel.sendTyping).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledWith({ embeds: [singleEmbedHaleem] });
  });

  it("is returning a single ayah on requesting a single ayah with no translation params", async () => {
    mockedGet.mockResolvedValue({
      data: output65,
      status: 200,
    } as AxiosResponse);

    await quranCmd.execute(msg, ["26:65"], clientCU);
    expect(msg.channel.sendTyping).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledWith({ embeds: [singleEmbedShort] });
  });

  it("is returning a ayah on requesting a single ayah with no translation params and translation code in cache", async () => {
    mockedGet.mockResolvedValue({
      data: output65Haleem,
      status: 200,
    } as AxiosResponse);
    clientCU.quranTrs.cache.get.mockResolvedValue(85);

    await quranCmd.execute(msg, ["26:65"], clientCU);
    expect(msg.channel.sendTyping).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledWith({ embeds: [singleEmbedHaleem] });
  });

  it("is returning multiple ayahs on requesting multiple ayahs with no translation params and not in cache", async () => {
    mockedGet
      .mockResolvedValueOnce({
        data: output65,
        status: 200,
      } as AxiosResponse)
      .mockResolvedValueOnce({
        data: output66,
        status: 200,
      } as AxiosResponse);
    clientCU.quranTrs.cache.get.mockResolvedValue(undefined);

    await quranCmd.execute(msg, ["26:65-66"], clientCU);
    expect(msg.channel.sendTyping).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledWith({ embeds: [multipleEmbedShort] });
  });

  it("is returning a single ayah on requesting a single ayah with translation params", async () => {
    mockedGet.mockResolvedValue({
      data: output65Haleem,
      status: 200,
    } as AxiosResponse);

    await quranCmd.execute(msg, ["26:65", "haleem"], clientCU);
    expect(msg.channel.sendTyping).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledWith({ embeds: [singleEmbedHaleem] });
  });

  it("is returning multiple ayahs on requesting multiple ayahs with translation params", async () => {
    mockedGet
      .mockResolvedValueOnce({
        data: output65Haleem,
        status: 200,
      } as AxiosResponse)
      .mockResolvedValueOnce({
        data: output66Haleem,
        status: 200,
      } as AxiosResponse);

    await quranCmd.execute(msg, ["26:65-66", "haleem"], clientCU);
    expect(msg.channel.sendTyping).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledWith({ embeds: [multipleEmbedHaleem] });
  });

  it("is returning syntax error on no params", async () => {
    await quranCmd.execute(msg, [], clientCU);
    expect(msg.channel.sendTyping).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledWith({
      embeds: [await syntax_error("<verse_key (e.g. 3:157 or 3:100-105)>")],
    });
  });

  it("is returning datatype error on invalid verse_key", async () => {
    await quranCmd.execute(msg, ["26"], clientCU);
    expect(msg.channel.sendTyping).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledWith({
      embeds: [await invalid_datatype("26", "a valid verse key")],
    });
  });

  it("is returning translation code error on invalid translation code", async () => {
    await quranCmd.execute(msg, ["26:65", "blah"], clientCU);
    expect(msg.channel.sendTyping).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledWith({
      embeds: [
        await invalid_datatype(
          "blah",
          "a valid translation code listed [here](https://github.com/AyahBot-Dev/AyahBot-Discord/wiki/Translations)"
        ),
      ],
    });
  });

  it("is handling errors", async () => {
    await quranCmd.execute(errMsg, [], clientCU);
    expect(errMsg.reply).toBeCalledWith({ embeds: [embed_error] });
  });

  db.goOffline();
});
