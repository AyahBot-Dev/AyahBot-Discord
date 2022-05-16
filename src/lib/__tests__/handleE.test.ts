import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  afterAll,
} from "@jest/globals";
import Mail from "nodemailer/lib/mailer/index.js";
import { mocked } from "jest-mock";

import { handleE } from "../utils";
import { db } from "../initDB";

describe("Function: handleE()", () => {
  const e: Error = {
    name: "An error",
    message: "An error",
    stack: "Blah",
  };

  const expectedParams = {
    from: `AyahBot Mailer <${process.env.SENDER_MAIL}>`,
    to: process.env.RECEIVER_MAIL,
    subject: "Caught a new error",
    text: `Assalamu'alaikum wa rahmatullahi wa barakatuh, dev! Hope you are fine by the grace of Almighty. \nRecently, I have faced some errors while doing Testing with jest. For your conveniance, the error is given below: \n\`\`\`${e.message}\n${e.stack}\`\`\``,
    html: `<p>Assalamu'alaikum wa rahmatullahi wa barakatuh, dev!</p><p>Hope you are fine by the grace of Almighty.</p>\n<p>Recently, I have faced some errors while doing Testing with jest. For your conveniance, the error is given below: </p></br><pre>${e.message}</br>\n${e.stack}</pre>`,
  };

  let mMailer;
  let mConsole;

  beforeEach(() => {
    jest.spyOn(Mail.prototype, "sendMail");
    jest.spyOn(console, "error");

    mMailer = mocked(Mail.prototype.sendMail);
    mConsole = mocked(console.error);

    mConsole.mockReturnValue("");
  });

  afterEach(() => (mMailer.mockRestore(), mConsole.mockRestore()));

  afterAll(() => jest.restoreAllMocks());

  it("is consoling errors", async () => {
    mMailer.mockResolvedValue(true);
    await handleE(e, "Testing with jest");
    expect(mConsole).toHaveBeenCalledWith(e);
  });

  it("is mailing errors with correct parameters", async () => {
    mMailer.mockResolvedValue(true);
    const sentError = await handleE(e, "Testing with jest");
    expect(sentError).toBe(true);
    expect(mMailer).toHaveBeenCalledWith(expectedParams);
  });

  it("is consoling mailing errors", async () => {
    try {
      mMailer.mockRejectedValue(new Error("Mailing error"));
      await handleE(new Error("An error"), "Testing with jest");
    } catch (e) {
      expect(e).toEqual("Mailing error");
      expect(mConsole).toHaveBeenCalledTimes(1);
    }
  });

  db.goOffline();
});
