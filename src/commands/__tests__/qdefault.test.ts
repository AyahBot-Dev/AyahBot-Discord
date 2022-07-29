import { jest, describe, it, expect } from "@jest/globals";
import { CacheType, CommandInteractionOption } from "discord.js";
import { mocked } from "jest-mock";

import { clientCU, errMsg, msg } from "../../helpers/tests/variables";
import {
  create_embed,
  embed_error,
  invalid_datatype,
} from "../../lib/embeds/embeds";
import { colors } from "../../lib/embeds/infos";
import { db, scheduledJobs } from "../../lib/initDB";

import qdefaultCmd from "../qdefault";

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

describe("Command: qdefault", () => {
  const mockedJobs = mocked(scheduledJobs);

  it("is returning success embed on slash", async () => {
    mockedJobs.update.mockResolvedValue();
    await qdefaultCmd.execute(
      msg,
      [{ value: "haleem" }] as unknown as CommandInteractionOption<CacheType>[],
      clientCU
    );
    expect(clientCU.quranTrs.cache.set).toBeCalledWith(msg.guild.id, 85);
    expect(msg.reply).toBeCalledWith({
      embeds: [
        await create_embed(
          "Default Quran translation saved",
          "In Shaa Allah, from now on, you will receive `haleem` translations by default",
          colors.success
        ),
      ],
    });
  });

  it("is returning success embed", async () => {
    mockedJobs.update.mockResolvedValue();
    await qdefaultCmd.execute(msg, ["haleem"], clientCU);
    expect(clientCU.quranTrs.cache.set).toBeCalledWith(msg.guild.id, 85);
    expect(msg.reply).toBeCalledWith({
      embeds: [
        await create_embed(
          "Default Quran translation saved",
          "In Shaa Allah, from now on, you will receive `haleem` translations by default",
          colors.success
        ),
      ],
    });
  });

  it("is returning success embed if `remove` was called", async () => {
    mockedJobs.remove.mockResolvedValue();
    await qdefaultCmd.execute(msg, ["remove"], clientCU);
    expect(clientCU.quranTrs.cache.delete).toBeCalledWith(msg.guild.id);
    expect(msg.reply).toBeCalledWith({
      embeds: [
        await create_embed(
          "Custom Quran Translation was removed successfully",
          "In Shaa Allah, from now on, you will receive the default `hilali` translations",
          colors.success
        ),
      ],
    });
  });

  it("is returning datatype embed on invalid translation id", async () => {
    await qdefaultCmd.execute(msg, ["blah"], clientCU);
    expect(msg.reply).toBeCalledWith({
      embeds: [
        await invalid_datatype(
          "blah",
          "a valid translation code listed [here](https://github.com/AyahBot-Dev/AyahBot-Discord/wiki/Translations)"
        ),
      ],
    });
  });

  it("is returning error if quran translation could not be removed correctly", async () => {
    mockedJobs.remove.mockRejectedValue("");

    await qdefaultCmd.execute(msg, ["remove"], clientCU);
    expect(msg.reply).toBeCalledWith({
      embeds: [embed_error],
    });
  });

  it("is returning error if quran translation could not be saved correctly", async () => {
    mockedJobs.update.mockRejectedValue("");

    await qdefaultCmd.execute(msg, ["hilali"], clientCU);
    expect(msg.reply).toBeCalledWith({
      embeds: [embed_error],
    });
  });

  it("is handling errors", async () => {
    await qdefaultCmd.execute(errMsg, [], clientCU);
    expect(errMsg.reply).toBeCalledWith({ embeds: [embed_error] });
  });

  db.goOffline();
});
