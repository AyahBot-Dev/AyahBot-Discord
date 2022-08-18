import { jest, describe, it, expect, afterEach } from "@jest/globals";
import { mocked } from "jest-mock";
import schedule from "node-schedule";

import { db, scheduledJobs } from "../initDB";
import {
  guildData,
  guild,
  specSnap,
  guildDataRaw,
  guildAllSnap,
  guildAllRaw,
  guildDFactory,
  guildDExFactory,
  guildDRFactory,
} from "../../helpers/tests/variables";
import DBHandler from "../DBHandler";
import { Lang } from "../../types";

jest.mock("../initDB", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = jest.requireActual("../initDB") as any;
  return {
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

jest.mock("../utils", () => {
  const utils = jest.requireActual("../utils") as object;
  return { ...utils, handleE: jest.fn() };
});

describe("Object: DBHandler", () => {
  const mockedJobs = mocked(scheduledJobs);

  afterEach(jest.clearAllMocks as () => void);

  describe("Object: settings", () => {
    describe("Function: fetch()", () => {
      it("is returning settings properly while quran, lang, timezone, channel, time, prefix is set", async () => {
        const dataTI = await guildDFactory(false, true, true, true, true, true);
        const toCompare = guildDExFactory(true, true, true, true, true);

        mockedJobs.once.mockResolvedValue(dataTI);

        const data = await DBHandler.settings.fetch(guild.id);
        expect(data).toEqual(toCompare);
      });

      it("is returning settings properly while only quran, lang, timezone, channel, time is set", async () => {
        const dataTI = await guildDFactory(false, true, true, true, true);
        const toCompare = guildDExFactory(true, true, true, true);

        mockedJobs.once.mockResolvedValue(dataTI);

        const data = await DBHandler.settings.fetch(guild.id);
        expect(data).toEqual(toCompare);
      });

      it("is returning settings properly while only timezone, channel, time is set", async () => {
        const dataTI = await guildDFactory(false, false, true, true);
        const toCompare = guildDExFactory(false, true, true);

        mockedJobs.once.mockResolvedValue(dataTI);

        const data = await DBHandler.settings.fetch(guild.id);
        expect(data).toEqual(toCompare);
      });

      it("is returning settings properly while only quran is set", async () => {
        const dataTI = await guildDFactory(false, true);
        const toCompare = guildDExFactory(true);

        mockedJobs.once.mockResolvedValue(dataTI);

        const data = await DBHandler.settings.fetch(guild.id);
        expect(data).toEqual(toCompare);
      });

      it("is returning settings properly while only lang is set", async () => {
        const dataTI = await guildDFactory(false, false, false, false, true);
        const toCompare = guildDExFactory(false, false, false, true);

        mockedJobs.once.mockResolvedValue(dataTI);

        const data = await DBHandler.settings.fetch(guild.id);
        expect(data).toEqual(toCompare);
      });

      it("is returning settings properly while only timezone is set", async () => {
        const dataTI = await guildDFactory(false, false, false, true);
        const toCompare = guildDExFactory(false, false, true);

        mockedJobs.once.mockResolvedValue(dataTI);

        const data = await DBHandler.settings.fetch(guild.id);
        expect(data).toEqual(toCompare);
      });

      it("is returning settings properly while nothing is set", async () => {
        const dataTI = await guildDFactory();
        const toCompare = guildDExFactory();

        mockedJobs.once.mockResolvedValue(dataTI);

        const data = await DBHandler.settings.fetch(guild.id);
        expect(data).toEqual(toCompare);
      });

      it("is handling errors", async () => {
        mockedJobs.once.mockRejectedValue("");

        const settings = await DBHandler.settings.fetch("invalidId");

        expect(settings).not.toBeTruthy();
      });
    });

    describe("Function: store()", () => {
      it("is storing data properly when quran, lang, timezone, channel, time, prefix is set", async () => {
        await DBHandler.settings.store(
          guildData._id,
          guildDataRaw.quran,
          guildDataRaw.timezone,
          guildDataRaw.channel,
          guildDataRaw.spec,
          guildData.prefix,
          guildData.lang as Lang
        );

        expect(mockedJobs.update).toBeCalledTimes(1);
        expect(mockedJobs.update).toBeCalledWith(guildData);
      });

      it("is storing data properly when only quran, lang, timezone, channel, time is set", async () => {
        const toCompare = guildDRFactory(false, true, true, true, true);

        await DBHandler.settings.store(
          guildData._id,
          guildDataRaw.quran,
          guildDataRaw.timezone,
          guildDataRaw.channel,
          guildDataRaw.spec,
          undefined,
          guildDataRaw.lang as Lang
        );

        expect(mockedJobs.update).toBeCalledTimes(1);
        expect(mockedJobs.update).toBeCalledWith(toCompare);
      });

      it("is storing data properly when only timezone, channel, time is set", async () => {
        const toCompare = guildDRFactory(false, false, true, true);

        await DBHandler.settings.store(
          guildData._id,
          undefined,
          guildDataRaw.timezone,
          guildDataRaw.channel,
          guildDataRaw.spec
        );

        expect(mockedJobs.update).toBeCalledTimes(1);
        expect(mockedJobs.update).toBeCalledWith(toCompare);
      });

      it("is storing data properly when only quran is set", async () => {
        const toCompare = guildDRFactory(false, true);

        await DBHandler.settings.store(guildData._id, guildDataRaw.quran);

        expect(mockedJobs.update).toBeCalledTimes(1);
        expect(mockedJobs.update).toBeCalledWith(toCompare);
      });

      it("is storing data properly when only lang is set", async () => {
        const toCompare = guildDRFactory(false, false, false, false, true);

        await DBHandler.settings.store(
          guildData._id,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          guildDataRaw.lang as Lang
        );

        expect(mockedJobs.update).toBeCalledTimes(1);
        expect(mockedJobs.update).toBeCalledWith(toCompare);
      });

      it("is storing data properly when only timezone is set", async () => {
        const toCompare = guildDRFactory(false, false, false, true);

        await DBHandler.settings.store(
          guildData._id,
          undefined,
          guildDataRaw.timezone
        );

        expect(mockedJobs.update).toBeCalledTimes(1);
        expect(mockedJobs.update).toBeCalledWith(toCompare);
      });

      it("is handling errors", async () => {
        mockedJobs.update.mockRejectedValue("");

        const dataStored = await DBHandler.settings.store("invalidId", "");

        expect(dataStored).not.toBeTruthy();
      });
    });
  });

  describe("Object: scheduler", () => {
    describe("Function: init()", () => {
      it("is successfully creating a schedule event", async () => {
        const data = await guildDFactory(false, true, true, true);

        mockedJobs.once.mockResolvedValue(data);

        const scheInit = await DBHandler.scheduler.init(
          guild,
          guildDataRaw.channel,
          guildDataRaw.spec
        );

        expect(schedule.scheduledJobs[guild.id]).toStrictEqual(
          expect.any(schedule.Job)
        );
        expect(scheInit).toBeTruthy();
      });

      it("is successfully creating a schedule event even if custom quran translation wasn't set", async () => {
        const data = await guildDFactory(false, false, true, true);

        mockedJobs.once.mockResolvedValue(data);

        const scheInit = await DBHandler.scheduler.init(
          guild,
          guildDataRaw.channel,
          guildDataRaw.spec
        );

        expect(schedule.scheduledJobs[guild.id]).toStrictEqual(
          expect.any(schedule.Job)
        );
        expect(scheInit).toBeTruthy();
      });

      it("is successfully cancelling and creating a new scheduled Job on recalling with a guild that was previously added", async () => {
        const data = await guildDFactory(false, true, true, true);

        mockedJobs.once.mockResolvedValue(data);

        const scheInit = await DBHandler.scheduler.init(
          guild,
          guildDataRaw.channel,
          guildDataRaw.spec
        );

        expect(schedule.scheduledJobs[guild.id]).toStrictEqual(
          expect.any(schedule.Job)
        );
        expect(scheInit).toBeTruthy();
      });

      it("is returning timezone unconfigured error", async () => {
        const data = await guildDFactory(false, true, false, false);

        mockedJobs.once.mockResolvedValue(data);

        const scheInit = await DBHandler.scheduler.init(
          guild,
          guildDataRaw.channel,
          guildDataRaw.spec
        );

        expect(scheInit).toBeNull();
      });

      it("is handling errors", async () => {
        mockedJobs.once.mockRejectedValue("");

        const scheInit = await DBHandler.scheduler.init(
          guild,
          guildDataRaw.channel,
          guildDataRaw.spec
        );

        expect(scheInit).toBeUndefined();
      });
    });

    describe("Function: updateTZ()", () => {
      it("is successfully rescheduling", async () => {
        mockedJobs.once.mockResolvedValue(specSnap);

        const updatedTZ = await DBHandler.scheduler.updateTZ(
          guild.id,
          guildDataRaw.timezone
        );

        expect(schedule.scheduledJobs[guild.id]).toStrictEqual(
          expect.any(schedule.Job)
        );
        expect(updatedTZ).toBeTruthy();
      });

      it("is returning spec unconfigured error", async () => {
        const data = await guildDFactory(true);

        mockedJobs.once.mockResolvedValue(data);

        const updatedTZ = await DBHandler.scheduler.updateTZ(
          guild.id,
          guildDataRaw.timezone
        );

        expect(updatedTZ).toBeNull();
      });

      it("is handling errors", async () => {
        mockedJobs.once.mockRejectedValue("");

        const updatedTZ = await DBHandler.scheduler.updateTZ(
          guild.id,
          guildDataRaw.timezone
        );

        expect(updatedTZ).toBeUndefined();
      });
    });
  });

  describe("Object: utils", () => {
    describe("Function: fetchAll()", () => {
      it("is correctly fetciching all server datas", async () => {
        mockedJobs.once.mockResolvedValue(guildAllSnap);

        const dbData = await DBHandler.utils.fetchAll();

        expect(dbData).toBe(guildAllRaw);
      });

      it("is handling errors", async () => {
        mockedJobs.once.mockRejectedValue("");

        const dbData = await DBHandler.utils.fetchAll();

        expect(dbData).toBeUndefined();
      });
    });

    describe("Function: removeGuild()", () => {
      it("is removing guilds successfully", async () => {
        mockedJobs.remove.mockResolvedValue();

        const guildIsRemoved = await DBHandler.utils.removeGuild(guildData._id);

        expect(guildIsRemoved).toBeUndefined();
      });

      it("is handling errors", async () => {
        mockedJobs.remove.mockRejectedValue("");

        const guildIsRemoved = await DBHandler.utils.removeGuild(guildData._id);

        expect(guildIsRemoved).toBe(false);
      });
    });

    describe("Function: removePrefix()", () => {
      it("is removing prefixes successfully", async () => {
        mockedJobs.remove.mockResolvedValue();

        const prefixIsRemoved = await DBHandler.utils.removePrefix(
          guildData._id
        );

        expect(prefixIsRemoved).toBeUndefined();
      });

      it("is handling errors", async () => {
        mockedJobs.remove.mockRejectedValue("");

        const prefixIsRemoved = await DBHandler.utils.removePrefix(
          guildData._id
        );

        expect(prefixIsRemoved).toBe(false);
      });
    });

    describe("Function: removeQuranTrs()", () => {
      it("is removing quran translation defaults successfully", async () => {
        mockedJobs.remove.mockResolvedValue();

        const quranTrsIsRemoved = await DBHandler.utils.removeQuranTrs(
          guildData._id
        );

        expect(quranTrsIsRemoved).toBeUndefined();
      });

      it("is handling errors", async () => {
        mockedJobs.remove.mockRejectedValue("");

        const quranTrsIsRemoved = await DBHandler.utils.removeQuranTrs(
          guildData._id
        );

        expect(quranTrsIsRemoved).toBe(false);
      });
    });

    describe("Function: removeLang()", () => {
      it("is removing lang translation defaults successfully", async () => {
        mockedJobs.remove.mockResolvedValue();

        const langIsRemoved = await DBHandler.utils.removeLang(guildData._id);

        expect(langIsRemoved).toBeUndefined();
      });

      it("is handling errors", async () => {
        mockedJobs.remove.mockRejectedValue("");

        const langIsRemoved = await DBHandler.utils.removeLang(guildData._id);

        expect(langIsRemoved).toBe(false);
      });
    });
  });

  db.goOffline();
});
