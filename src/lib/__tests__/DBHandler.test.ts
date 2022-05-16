import { jest, describe, it, expect, afterEach } from "@jest/globals";
import { mocked } from "jest-mock";
import schedule from "node-schedule";

import { db, scheduledJobs } from "../initDB";
import {
  csGuildData,
  csGuildDex,
  csqGuildData,
  csqGuildDex,
  guildData,
  guildDataSnap,
  guildDEx,
  guild,
  nGuildDEx,
  qGuildData,
  qGuildDEx,
  tGuildData,
  tGuildDEx,
  specSnap,
  guildDataRaw,
  guildAllSnap,
  guildAllRaw,
} from "../../helpers/tests/variables";
import DBHandler from "../DBHandler";

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

  afterEach(() => jest.clearAllMocks());
  describe("Object: settings", () => {
    describe("Function: fetch()", () => {
      it("is returning settings properly while quran, timezone, channel, time, prefix is set", async () => {
        const dataTI = await guildDataSnap(true, true, true, true);

        mockedJobs.once.mockResolvedValue(dataTI);

        const data = await DBHandler.settings.fetch(guild.id);
        expect(data).toEqual(guildDEx);
      });

      it("is returning settings properly while only quran, timezone, channel, time is set", async () => {
        const dataTI = await guildDataSnap(true, true, true);

        mockedJobs.once.mockResolvedValue(dataTI);

        const data = await DBHandler.settings.fetch(guild.id);
        expect(data).toEqual(csqGuildDex);
      });

      it("is returning settings properly while only timezone, channel, time is set", async () => {
        const dataTI = await guildDataSnap(false, true, true);

        mockedJobs.once.mockResolvedValue(dataTI);

        const data = await DBHandler.settings.fetch(guild.id);
        expect(data).toEqual(csGuildDex);
      });

      it("is returning settings properly while only quran is set", async () => {
        const dataTI = await guildDataSnap(true, false, false);

        mockedJobs.once.mockResolvedValue(dataTI);

        const data = await DBHandler.settings.fetch(guild.id);
        expect(data).toEqual(qGuildDEx);
      });

      it("is returning settings properly while only timezone is set", async () => {
        const dataTI = await guildDataSnap(false, false, true);

        mockedJobs.once.mockResolvedValue(dataTI);

        const data = await DBHandler.settings.fetch(guild.id);
        expect(data).toEqual(tGuildDEx);
      });

      it("is returning settings properly while nothing is set", async () => {
        const dataTI = await guildDataSnap(false, false, false);

        mockedJobs.once.mockResolvedValue(dataTI);

        const data = await DBHandler.settings.fetch(guild.id);
        expect(data).toEqual(nGuildDEx);
      });

      it("is handling errors", async () => {
        mockedJobs.once.mockRejectedValue("");

        const settings = await DBHandler.settings.fetch("invalidId");

        expect(settings).not.toBeTruthy();
      });
    });

    describe("Function: store()", () => {
      it("is storing data properly when quran, timezone, channel, time, prefix is set", async () => {
        await DBHandler.settings.store(
          guildData._id,
          guildDataRaw.quran,
          guildDataRaw.timezone,
          guildDataRaw.channel,
          guildDataRaw.spec,
          guildData.prefix
        );

        expect(mockedJobs.update).toBeCalledTimes(1);
        expect(mockedJobs.update).toBeCalledWith(guildData);
      });

      it("is storing data properly when only quran, timezone, channel, time is set", async () => {
        await DBHandler.settings.store(
          guildData._id,
          guildDataRaw.quran,
          guildDataRaw.timezone,
          guildDataRaw.channel,
          guildDataRaw.spec
        );

        expect(mockedJobs.update).toBeCalledTimes(1);
        expect(mockedJobs.update).toBeCalledWith(csqGuildData);
      });

      it("is storing data properly when only timezone, channel, time is set", async () => {
        await DBHandler.settings.store(
          guildData._id,
          undefined,
          guildDataRaw.timezone,
          guildDataRaw.channel,
          guildDataRaw.spec
        );

        expect(mockedJobs.update).toBeCalledTimes(1);
        expect(mockedJobs.update).toBeCalledWith(csGuildData);
      });

      it("is storing data properly when only quran is set", async () => {
        await DBHandler.settings.store(guildData._id, guildDataRaw.quran);

        expect(mockedJobs.update).toBeCalledTimes(1);
        expect(mockedJobs.update).toBeCalledWith(qGuildData);
      });

      it("is storing data properly when only timezone is set", async () => {
        await DBHandler.settings.store(
          guildData._id,
          undefined,
          guildDataRaw.timezone
        );

        expect(mockedJobs.update).toBeCalledTimes(1);
        expect(mockedJobs.update).toBeCalledWith(tGuildData);
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
        const data = await guildDataSnap(true, true, true);

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
        const data = await guildDataSnap(false, true, true);

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
        const data = await guildDataSnap(true, true, true);

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
        const data = await guildDataSnap(true, false, false);

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
        const data = await guildDataSnap(false, false, false);

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
  });

  db.goOffline();
});
