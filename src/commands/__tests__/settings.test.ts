import { jest, describe, it, expect } from "@jest/globals";
import { mocked } from "jest-mock";

import settingsCmd from "../settings";
import {
  csGuildDExStr,
  csqGuildDExStr,
  errMsg,
  guildDataSnap,
  guildDExStr,
  msg,
  qGuildDExStr,
  tGuildDExStr,
} from "../../helpers/tests/variables";
import { create_embed, embed_error } from "../../lib/embeds/embeds";
import { db, scheduledJobs } from "../../lib/initDB";
import { colors } from "../../lib/embeds/infos";

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

describe("Command: settings", () => {
  const mockedJobs = mocked(scheduledJobs);

  it("is returning a correct embed while quran, timezone, channel, time, prefix is set", async () => {
    const data = await guildDataSnap(true, true, true, true);
    mockedJobs.once.mockResolvedValue(data);

    await settingsCmd.execute(msg);
    expect(msg.reply).toBeCalledWith({
      embeds: [await create_embed("Settings: ", guildDExStr, colors.info)],
    });
  });

  it("is returning a correct embed while only quran, timezone, channel, time is set", async () => {
    const data = await guildDataSnap(true, true, true);
    mockedJobs.once.mockResolvedValue(data);

    await settingsCmd.execute(msg);
    expect(msg.reply).toBeCalledWith({
      embeds: [await create_embed("Settings: ", csqGuildDExStr, colors.info)],
    });
  });

  it("is returning a correct embed while only timezone, channel, time is set", async () => {
    const data = await guildDataSnap(false, true, true);
    mockedJobs.once.mockResolvedValue(data);

    await settingsCmd.execute(msg);
    expect(msg.reply).toBeCalledWith({
      embeds: [await create_embed("Settings: ", csGuildDExStr, colors.info)],
    });
  });

  it("is returning a correct embed while only quran is set", async () => {
    const data = await guildDataSnap(true, false, false);
    mockedJobs.once.mockResolvedValue(data);

    await settingsCmd.execute(msg);
    expect(msg.reply).toBeCalledWith({
      embeds: [await create_embed("Settings: ", qGuildDExStr, colors.info)],
    });
  });

  it("is returning a correct embed while only timezone is set", async () => {
    const data = await guildDataSnap(false, false, true);
    mockedJobs.once.mockResolvedValue(data);

    await settingsCmd.execute(msg);
    expect(msg.reply).toBeCalledWith({
      embeds: [await create_embed("Settings: ", tGuildDExStr, colors.info)],
    });
  });

  it("is returning error embed if settings fetching wasn't successful", async () => {
    mockedJobs.once.mockRejectedValue(false);

    await settingsCmd.execute(msg);
    expect(msg.reply).toBeCalledWith({ embeds: [embed_error] });
  });

  it("is handling errors", async () => {
    await settingsCmd.execute(errMsg);
    expect(errMsg.reply).toBeCalledWith({ embeds: [embed_error] });
  });

  db.goOffline();
});
