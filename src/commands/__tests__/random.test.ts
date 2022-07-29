import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { mocked } from "jest-mock";

import {
  output65,
  msg,
  errMsg,
  output65Haleem,
  clientCU,
} from "../../helpers/tests/variables";
import { embed_error, invalid_datatype } from "../../lib/embeds/embeds";
import { db } from "../../lib/initDB";
import axios from "../../lib/axiosInstance";

import randomCmd from "../random";

import type { AxiosResponse } from "axios";
import type { CacheType, CommandInteractionOption } from "discord.js";

jest.mock("../../lib/axiosInstance", () => ({
  get: jest.fn(),
}));
jest.mock("../../lib/utils", () => {
  const utils = jest.requireActual("../../lib/utils") as object;
  return { __esModule: true, ...utils, handleE: jest.fn() };
});

describe("Command: random", () => {
  const mockedGet = mocked(axios.get);
  const spy = jest.spyOn(Math, "floor");

  beforeEach(jest.resetAllMocks as unknown as () => void);

  it("is sending a random verse everytime with translation params in slash", async () => {
    mockedGet.mockResolvedValue({
      data: output65Haleem,
      status: 200,
    } as AxiosResponse);

    await randomCmd.execute(
      msg,
      [{ value: "haleem" }] as unknown as CommandInteractionOption<CacheType>[],
      clientCU
    );

    expect(spy).toBeCalledTimes(2);
  });

  it("is sending a random verse everytime with translation params", async () => {
    mockedGet.mockResolvedValue({
      data: output65Haleem,
      status: 200,
    } as AxiosResponse);

    await randomCmd.execute(msg, ["haleem"], clientCU);

    expect(spy).toBeCalledTimes(2);
  });

  it("is sending a random verse everytime with no translation params if translation code is on cache", async () => {
    mockedGet.mockResolvedValue({
      data: output65Haleem,
      status: 200,
    } as AxiosResponse);
    clientCU.quranTrs.cache.get.mockResolvedValue(85);

    await randomCmd.execute(msg, [], clientCU);

    expect(spy).toBeCalledTimes(2);
  });

  it("is sending a random verse everytime with no translation params if translation code not on cache", async () => {
    mockedGet.mockResolvedValue({
      data: output65,
      status: 200,
    } as AxiosResponse);
    clientCU.quranTrs.cache.get.mockResolvedValue(undefined);

    await randomCmd.execute(msg, [], clientCU);

    expect(spy).toBeCalledTimes(2);
  });

  it("is returning translation code error on invalid translation code", async () => {
    await randomCmd.execute(msg, ["blah"], clientCU);
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
    await randomCmd.execute(errMsg, [], clientCU);
    expect(errMsg.reply).toBeCalledWith({ embeds: [embed_error] });
  });

  db.goOffline();
});
