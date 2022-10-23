import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterAll,
} from "@jest/globals";
import { mocked } from "jest-mock";

import {
  output65,
  msg,
  output65Haleem,
  clientCU,
  singleEmbedHaleem,
  singleEmbedShort,
} from "../../helpers/tests/variables";
import { invalid_datatype } from "../../lib/embeds/embeds";
import { db } from "../../lib/initDB";
import axios from "../../lib/axiosInstance";

import rtquranCmd from "../rtquran";

import type { AxiosResponse } from "axios";
import type { CacheType, CommandInteractionOption } from "discord.js";

jest.mock("../../lib/axiosInstance", () => ({
  get: jest.fn(),
}));
jest.mock("../../lib/utils", () => {
  const utils = jest.requireActual("../../lib/utils") as object;
  return { __esModule: true, ...utils, handleE: jest.fn() };
});

describe("Command: rtquran", () => {
  const mockedGet = mocked(axios.get);
  const spy = jest.spyOn(Math, "floor");

  beforeEach(jest.resetAllMocks as unknown as () => void);

  afterAll(jest.resetAllMocks as unknown as () => void);

  it("is sending a random verse everytime with translation params in slash", async () => {
    mockedGet.mockResolvedValueOnce({
      data: output65Haleem,
      status: 200,
    } as AxiosResponse);

    spy.mockReturnValueOnce(26);
    spy.mockReturnValueOnce(65);

    await rtquranCmd.execute(
      msg,
      [{ value: "haleem" }] as unknown as CommandInteractionOption<CacheType>[],
      clientCU
    );

    expect(spy).toBeCalledTimes(2);
    expect(msg.reply).toBeCalledWith({ embeds: [singleEmbedHaleem] });
  });

  it("is sending a random verse everytime with translation params", async () => {
    mockedGet.mockResolvedValueOnce({
      data: output65Haleem,
      status: 200,
    } as AxiosResponse);
    spy.mockReturnValueOnce(26);
    spy.mockReturnValueOnce(65);

    await rtquranCmd.execute(msg, ["haleem"], clientCU);

    expect(spy).toBeCalledTimes(2);
    expect(msg.reply).toBeCalledWith({ embeds: [singleEmbedHaleem] });
  });

  it("is sending a random verse everytime with no translation params if translation code is on cache", async () => {
    mockedGet.mockResolvedValue({
      data: output65Haleem,
      status: 200,
    } as AxiosResponse);
    clientCU.quranTrs.cache.get.mockResolvedValue(85);
    spy.mockReturnValueOnce(26);
    spy.mockReturnValueOnce(65);

    await rtquranCmd.execute(msg, [], clientCU);

    expect(spy).toBeCalledTimes(2);
    expect(msg.reply).toBeCalledWith({ embeds: [singleEmbedHaleem] });
  });

  it("is sending a random verse everytime with no translation params if translation code not on cache", async () => {
    mockedGet.mockResolvedValueOnce({
      data: output65,
      status: 200,
    } as AxiosResponse);
    clientCU.quranTrs.cache.get.mockResolvedValue(undefined);
    spy.mockReturnValueOnce(26);
    spy.mockReturnValueOnce(65);

    await rtquranCmd.execute(msg, [], clientCU);

    expect(spy).toBeCalledTimes(2);
    expect(msg.reply).toBeCalledWith({ embeds: [singleEmbedShort] });
  });

  it("is returning translation code error on invalid translation code", async () => {
    await rtquranCmd.execute(msg, ["blah"], clientCU);

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

  db.goOffline();
});
