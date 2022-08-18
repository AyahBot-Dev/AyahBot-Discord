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
  msg,
  errMsg,
  output65Arabic,
  singleEmbedArabic,
} from "../../helpers/tests/variables";
import { embed_error } from "../../lib/embeds/embeds";
import { db } from "../../lib/initDB";
import axios from "../../lib/axiosInstance";

import raquranCmd from "../raquran";

import type { AxiosResponse } from "axios";

jest.mock("../../lib/axiosInstance", () => ({
  get: jest.fn(),
}));
jest.mock("../../lib/utils", () => {
  const utils = jest.requireActual("../../lib/utils") as object;
  return { __esModule: true, ...utils, handleE: jest.fn() };
});

describe("Command: raquran", () => {
  const mockedGet = mocked(axios.get);
  const spy = jest.spyOn(Math, "floor");

  beforeEach(jest.resetAllMocks as unknown as () => void);

  afterAll(jest.resetAllMocks as unknown as () => void);

  it("is sending a random verse everytime in slash", async () => {
    mockedGet.mockResolvedValueOnce({
      data: output65Arabic,
      status: 200,
    } as AxiosResponse);

    spy.mockReturnValueOnce(26);
    spy.mockReturnValueOnce(65);

    await raquranCmd.execute(msg);

    expect(spy).toBeCalledTimes(2);
    expect(msg.reply).toBeCalledWith({ embeds: [singleEmbedArabic] });
  });

  it("is sending a random verse everytime", async () => {
    mockedGet.mockResolvedValueOnce({
      data: output65Arabic,
      status: 200,
    } as AxiosResponse);

    spy.mockReturnValueOnce(26);
    spy.mockReturnValueOnce(65);

    await raquranCmd.execute(msg);

    expect(spy).toBeCalledTimes(2);
    expect(msg.reply).toBeCalledWith({ embeds: [singleEmbedArabic] });
  });

  it("is handling errors", async () => {
    await raquranCmd.execute(errMsg);
    expect(errMsg.reply).toBeCalledWith({ embeds: [embed_error] });
  });

  db.goOffline();
});
