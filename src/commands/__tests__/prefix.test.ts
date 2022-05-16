import { jest, describe, it, expect } from "@jest/globals";
import { mocked } from "jest-mock";

import { clientCU, errMsg, msg } from "../../helpers/tests/variables";
import {
  create_embed,
  embed_error,
  invalid_datatype,
  syntax_error,
} from "../../lib/embeds/embeds";
import { colors } from "../../lib/embeds/infos";
import { db, scheduledJobs } from "../../lib/initDB";

import prefixCmd from "../prefix";

import type { CommandInteractionOption, CacheType } from "discord.js";

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

describe("Command: prefix", () => {
  const mockedJobs = mocked(scheduledJobs);

  it("is returning success embed if prefix is set via slash", async () => {
    mockedJobs.update.mockResolvedValue();
    await prefixCmd.execute(
      msg,
      [
        { value: "!" },
      ] as unknown as readonly CommandInteractionOption<CacheType>[],
      clientCU
    );

    expect(clientCU.prefixes.cache.set).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledWith({
      embeds: [
        await create_embed(
          "Prefix was set successfully",
          "The prefix of your server was set to `!`",
          colors.success
        ),
      ],
    });
  });

  it("is returning success embed if prefix is set via message", async () => {
    mockedJobs.update.mockResolvedValue();
    await prefixCmd.execute(msg, ["!"], clientCU);

    expect(clientCU.prefixes.cache.set).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledWith({
      embeds: [
        await create_embed(
          "Prefix was set successfully",
          "The prefix of your server was set to `!`",
          colors.success
        ),
      ],
    });
  });

  it("is returning success embed if prefix is called as `remove`", async () => {
    mockedJobs.remove.mockResolvedValue();
    await prefixCmd.execute(msg, ["remove"], clientCU);
    expect(clientCU.prefixes.cache.delete).toBeCalledTimes(1);
    expect(msg.reply).toBeCalledWith({
      embeds: [
        await create_embed(
          "Prefix was removed successfully",
          "The custom prefix of your server was removed and set to the default `!ayah `",
          colors.success
        ),
      ],
    });
  });

  it("is returning syntax embed if argument is not present", async () => {
    await prefixCmd.execute(msg, [], clientCU);
    expect(msg.reply).toBeCalledWith({
      embeds: [await syntax_error(`<prefix (e.g. '!')>`)],
    });
  });

  it("is returning datatype embed on prefixes having `", async () => {
    await prefixCmd.execute(msg, ["`!"], clientCU);
    expect(msg.reply).toBeCalledWith({
      embeds: [
        await invalid_datatype(
          "```!``",
          `a valid prefix (must not contain \`, ', " or spaces)`
        ),
      ],
    });
  });

  it("is returning datatype embed on prefixes having '", async () => {
    await prefixCmd.execute(msg, ["'!"], clientCU);
    expect(msg.reply).toBeCalledWith({
      embeds: [
        await invalid_datatype(
          "``'!``",
          `a valid prefix (must not contain \`, ', " or spaces)`
        ),
      ],
    });
  });

  it(`is returning datatype embed on prefixes having "`, async () => {
    await prefixCmd.execute(msg, [`"!`], clientCU);
    expect(msg.reply).toBeCalledWith({
      embeds: [
        await invalid_datatype(
          `\`\`"!\`\``,
          `a valid prefix (must not contain \`, ', " or spaces)`
        ),
      ],
    });
  });

  it(`is returning datatype embed on prefixes having spaces`, async () => {
    await prefixCmd.execute(msg, ["! ayah"], clientCU);
    expect(msg.reply).toBeCalledWith({
      embeds: [
        await invalid_datatype(
          "``! ayah``",
          `a valid prefix (must not contain \`, ', " or spaces)`
        ),
      ],
    });
  });

  it("is returning error if prefix could not be removed correctly", async () => {
    mockedJobs.remove.mockRejectedValue("");

    await prefixCmd.execute(msg, ["remove"], clientCU);
    expect(msg.reply).toBeCalledWith({
      embeds: [embed_error],
    });
  });

  it("is returning error if prefix could not be saved correctly", async () => {
    mockedJobs.update.mockRejectedValue("");

    await prefixCmd.execute(msg, ["!"], clientCU);
    expect(msg.reply).toBeCalledWith({
      embeds: [embed_error],
    });
  });

  it("is handling errors", async () => {
    await prefixCmd.execute(errMsg, [], clientCU);
    expect(errMsg.reply).toBeCalledWith({ embeds: [embed_error] });
  });

  db.goOffline();
});
