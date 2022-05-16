import { GuildBasedChannel, MessageEmbed } from "discord.js";
import { jest } from "@jest/globals";

import type { Message, Guild, TextChannel } from "discord.js";

import type { DataSnapshot } from "@firebase/database-types";
import type { Job } from "node-schedule";
import { CustomClient } from "../../lib/classes/CustomClient";

export const dataInvalid = {
  code: 404,
  surah: "Not found",
  verse_translated: "",
  translation: NaN,
  translator: "",
  verse_key: "",
};
export const dataError = {
  code: 500,
  surah: "Internal Error",
  verse_translated: "",
  translation: NaN,
  translator: "",
  verse_key: "",
};
export const data65 = {
  code: 200,
  surah: "Surah Ash-Shu'ara (الشعراء - The Poets)",
  verse_translated: "  And We saved Mûsâ (Moses) and all those with him.",
  translation: 203,
  translator: "Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan",
  verse_key: "26:65",
};
export const outputInvalid = {
  status: 404,
  error: "Ayah not found",
};
export const output1 = {
  verse: {
    id: 1,
    verse_number: 1,
    verse_key: "1:1",
    juz_number: 1,
    hizb_number: 1,
    rub_number: 1,
    sajdah_type: null,
    sajdah_number: null,
    chapter_id: 1,
    page_number: 1,
    translations: [
      {
        id: 1122158,
        resource_id: 203,
        text: "  In the Name of Allâh, the Most Gracious, the Most Merciful",
        resource_name: "Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan",
      },
    ],
  },
};
export const output65 = {
  verse: {
    id: 2997,
    verse_number: 65,
    verse_key: "26:65",
    juz_number: 19,
    hizb_number: 37,
    rub_number: 148,
    sajdah_type: null,
    sajdah_number: null,
    chapter_id: 26,
    page_number: 370,
    translations: [
      {
        id: 1125154,
        resource_id: 203,
        text: "  And We saved Mûsâ (Moses) and all those with him.",
        resource_name: "Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan",
      },
    ],
  },
};
export const output66 = {
  verse: {
    id: 2998,
    verse_number: 66,
    verse_key: "26:66",
    juz_number: 19,
    hizb_number: 37,
    rub_number: 148,
    sajdah_type: null,
    sajdah_number: null,
    chapter_id: 26,
    page_number: 370,
    translations: [
      {
        id: 1125155,
        resource_id: 203,
        text: "    Then We drowned the others.",
        resource_name: "Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan",
      },
    ],
  },
};
export const output65Haleem = {
  verse: {
    id: 2997,
    verse_number: 65,
    verse_key: "26:65",
    juz_number: 19,
    hizb_number: 37,
    rub_number: 148,
    sajdah_type: null,
    sajdah_number: null,
    chapter_id: 26,
    page_number: 370,
    translations: [
      {
        id: 404700,
        resource_id: 85,
        text: "We saved Moses and all his companions,",
        resource_name: "Abdul Haleem",
      },
    ],
  },
};
export const output66Haleem = {
  verse: {
    id: 2998,
    verse_number: 66,
    verse_key: "26:66",
    juz_number: 19,
    hizb_number: 37,
    rub_number: 148,
    sajdah_type: null,
    sajdah_number: null,
    chapter_id: 26,
    page_number: 370,
    translations: [
      {
        id: 404701,
        resource_id: 85,
        text: "and drowned the rest.",
        resource_name: "Abdul Haleem",
      },
    ],
  },
};
export const outputLong = {
  verse: {
    id: 289,
    verse_number: 282,
    verse_key: "2:282",
    juz_number: 3,
    hizb_number: 5,
    rub_number: 19,
    sajdah_type: null,
    sajdah_number: null,
    chapter_id: 2,
    page_number: 48,
    translations: [
      {
        id: 1122446,
        resource_id: 203,
        text: "  O you who believe! When you contract a debt for a fixed period, write it down. Let a scribe write it down in justice between you. Let not the scribe refuse to write as Allâh has taught him, so let him write. Let him (the debtor) who incurs the liability dictate, and he must fear Allâh, his Lord, and diminish not anything of what he owes. But if the debtor is of poor understanding, or weak, or is unable to dictate for himself, then let his guardian dictate in justice. And get two witnesses out of your own men. And if there are not two men (available), then a man and two women, such as you agree for witnesses, so that if one of them (two women) errs, the other can remind her. And the witnesses should not refuse when they are called (for evidence). You should not become weary to write it (your contract), whether it be small or big, for its fixed term, that is more just with Allâh; more solid as evidence, and more convenient to prevent doubts among yourselves, save when it is a present trade which you carry out on the spot among yourselves, then there is no sin on you if you do not write it down. But take witnesses whenever you make a commercial contract. Let neither scribe nor witness suffer any harm, but if you do (such harm), it would be wickedness in you. So be afraid of Allâh; and Allâh teaches you. And Allâh is the All-Knower of each and everything.",
        resource_name: "Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan",
      },
    ],
  },
};
export const outputLong1 = {
  verse: {
    id: 290,
    verse_number: 283,
    verse_key: "2:283",
    juz_number: 3,
    hizb_number: 5,
    rub_number: 20,
    sajdah_type: null,
    sajdah_number: null,
    chapter_id: 2,
    page_number: 49,
    translations: [
      {
        id: 1122447,
        resource_id: 203,
        text: " And if you are on a journey and cannot find a scribe, then let there be a pledge taken (mortgaging)<sup foot_note=154404>1</sup>; then if one of you entrust the other, let the one who is entrusted discharge his trust (faithfully), and let him be afraid of Allâh, his Lord. And conceal not the evidence for he, who hides it, surely his heart is sinful. And Allâh is All-Knower of what you do.",
        resource_name: "Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan",
      },
    ],
  },
};
export const output285 = {
  verse: {
    id: 292,
    verse_number: 285,
    verse_key: "2:285",
    juz_number: 3,
    hizb_number: 5,
    rub_number: 20,
    sajdah_type: null,
    sajdah_number: null,
    chapter_id: 2,
    page_number: 49,
    translations: [
      {
        id: 1122449,
        resource_id: 203,
        text: '  The Messenger (Muhammad صلى الله عليه وسلم) believes in what has been sent down to him from his Lord, and (so do) the believers. Each one believes in Allâh, His Angels, His Books, and His Messengers. (They say), "We make no distinction between one another of His Messengers" - and they say, "We hear, and we obey. (We seek) Your Forgiveness, our Lord, and to You is the return (of all)."',
        resource_name: "Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan",
      },
    ],
  },
};
export const output286 = {
  verse: {
    id: 293,
    verse_number: 286,
    verse_key: "2:286",
    juz_number: 3,
    hizb_number: 5,
    rub_number: 20,
    sajdah_type: null,
    sajdah_number: null,
    chapter_id: 2,
    page_number: 49,
    translations: [
      {
        id: 1122450,
        resource_id: 203,
        text: '  Allâh burdens not a person beyond his scope. He gets reward for that (good) which he has earned, and he is punished for that (evil) which he has earned. "Our Lord! Punish us not if we forget or fall into error, our Lord! Lay not on us a burden like that which You did lay on those before us (Jews and Christians); our Lord! Put not on us a burden greater than we have strength to bear. Pardon us and grant us Forgiveness. Have mercy on us. You are our Maulâ (Patron, Supporter and Protector, etc.) and give us victory over the disbelieving people.<sup foot_note=154405>1</sup>"',
        resource_name: "Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan",
      },
    ],
  },
};
export const singleEmbedShort = new MessageEmbed({
  color: 1143554,
  title: "Surah Ash-Shu'ara (الشعراء - The Poets)",
  fields: [
    {
      name: "26:65",
      value: "  And We saved Mûsâ (Moses) and all those with him.",
    },
  ],
  footer: {
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan",
  },
});
export const singleEmbedLong = new MessageEmbed({
  color: 1143554,
  title: "Surah Al-Baqarah (البقرة - The Cow)",
  fields: [
    {
      name: "2:282",
      value:
        "  O you who believe! When you contract a debt for a fixed period, write it down. Let a scribe write it down in justice between you. Let not the scribe refuse to write as Allâh has taught him, so let him write. Let him (the debtor) who incurs the liability dictate, and he must fear Allâh, his Lord, and diminish not anything of what he owes. But if the debtor is of poor understanding, or weak, or is unable to dictate for himself, then let his guardian dictate in justice. And get two witnesses out of your own men. And if there are not two men (available), then a man and two women, such as you agree for witnesses, so that if one of them (two women) errs, the other can remind her. And the witnesses should not refuse when they are called (for evidence). You should not become weary to write it (your contract), whether it be small or big, for its fixed term, that is more just with Allâh; more solid as evidence, and more convenient to prevent doubts among yourselves, save wh... ([Read more](https://quran.com/2:282))",
    },
  ],
  footer: {
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan",
  },
});
export const singleEmbedHaleem = new MessageEmbed({
  color: 1143554,
  title: "Surah Ash-Shu'ara (الشعراء - The Poets)",
  fields: [
    {
      name: "26:65",
      value: "We saved Moses and all his companions,",
    },
  ],
  footer: {
    text: "Translation by: Abdul Haleem",
  },
});
export const multipleEmbedShort = new MessageEmbed({
  color: 1143554,
  title: "Surah Ash-Shu'ara (الشعراء - The Poets)",
  fields: [
    {
      name: "26:65",
      value: "  And We saved Mûsâ (Moses) and all those with him.",
    },
    {
      name: "26:66",
      value: "    Then We drowned the others.",
    },
  ],
  footer: {
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan",
  },
});
export const multipleEmbedHaleem = new MessageEmbed({
  color: 1143554,
  title: "Surah Ash-Shu'ara (الشعراء - The Poets)",
  fields: [
    {
      name: "26:65",
      value: "We saved Moses and all his companions,",
    },
    {
      name: "26:66",
      value: "and drowned the rest.",
    },
  ],
  footer: {
    text: "Translation by: Abdul Haleem",
  },
});
export const multipleEmbedLong = new MessageEmbed({
  color: 1143554,
  title: "Surah Al-Baqarah (البقرة - The Cow)",
  fields: [
    {
      name: "2:282",
      value:
        "  O you who believe! When you contract a debt for a fixed period, write it down. Let a scribe write it down in justice between you. Let not the scribe refuse to write as Allâh has taught him, so let him write. Let him (the debtor) who incurs the liability dictate, and he must fear Allâh, his Lord, and diminish not anything of what he owes. But if the debtor is of poor understanding, or weak, or is unable to dictate for himself, then let his guardian dictate in justice. And get two witnesses out of your own men. And if there are not two men (available), then a man and two women, such as you agree for witnesses, so that if one of them (two women) errs, the other can remind her. And the witnesses should not refuse when they are called (for evidence). You should not become weary to write it (your contract), whether it be small or big, for its fixed term, that is more just with Allâh; more solid as evidence, and more convenient to prevent doubts among yourselves, save wh... ([Read more](https://quran.com/2:282))",
    },
    {
      name: "2:283",
      value:
        " And if you are on a journey and cannot find a scribe, then let there be a pledge taken (mortgaging); then if one of you entrust the other, let the one who is entrusted discharge his trust (faithfully), and let him be afraid of Allâh, his Lord. And conceal not the evidence for he, who hides it, surely his heart is sinful. And Allâh is All-Knower of what you do.",
    },
  ],
  footer: {
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan",
  },
});
export const multipleEmbed404First = new MessageEmbed({
  color: 1143554,
  title: "Surah Al-Fatihah (الفاتحة - The Opener)",
  fields: [
    {
      name: "1:1",
      value: "  In the Name of Allâh, the Most Gracious, the Most Merciful",
    },
  ],
  footer: {
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan",
  },
});

export const multipleEmbed404Last = new MessageEmbed({
  color: 1143554,
  title: "Surah Al-Baqarah (البقرة - The Cow)",
  fields: [
    {
      name: "2:285",
      value:
        '  The Messenger (Muhammad صلى الله عليه وسلم) believes in what has been sent down to him from his Lord, and (so do) the believers. Each one believes in Allâh, His Angels, His Books, and His Messengers. (They say), "We make no distinction between one another of His Messengers" - and they say, "We hear, and we obey. (We seek) Your Forgiveness, our Lord, and to You is the return (of all)."',
    },
    {
      name: "2:286",
      value:
        '  Allâh burdens not a person beyond his scope. He gets reward for that (good) which he has earned, and he is punished for that (evil) which he has earned. "Our Lord! Punish us not if we forget or fall into error, our Lord! Lay not on us a burden like that which You did lay on those before us (Jews and Christians); our Lord! Put not on us a burden greater than we have strength to bear. Pardon us and grant us Forgiveness. Have mercy on us. You are our Maulâ (Patron, Supporter and Protector, etc.) and give us victory over the disbelieving people."',
    },
  ],
  footer: {
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan",
  },
});

export const ayah404Embed = new MessageEmbed({
  color: 16757248,
  title: "Not found",
  description: "The ayah (s) you requested doesn't exist",
});

export const msg = {
  channel: {
    sendTyping: jest.fn(),
  },
  guild: {
    id: "1234567",
    channels: {
      cache: {
        has: (s: string) =>
          ["12345678901", "123456789010", "123456789012"].includes(s),
        get: (s: string): GuildBasedChannel =>
          s == "12345678901"
            ? ({
                permissions: ["VIEW_CHANNEL", "EMBED_LINKS", "SEND_MESSAGES"],
              } as unknown as GuildBasedChannel)
            : s == "123456789012"
            ? ({
                permissions: ["VIEW_CHANNEL", "EMBED_LINKS", "SEND_MESSAGES"],
                type: "GUILD_TEXT",
              } as unknown as GuildBasedChannel)
            : ({
                permissions: [],
              } as unknown as GuildBasedChannel),
      },
    },
    me: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      permissionsIn: (channel: any) => ({
        has: (a: string[]) =>
          JSON.stringify(channel.permissions) === JSON.stringify(a),
      }),
    },
  },
  reply: jest.fn().mockResolvedValue({ delete: jest.fn() } as never),
  delete: jest.fn(),
} as unknown as Message;

export const errMsg = {
  channel: {
    sendTyping: jest.fn().mockRejectedValue("" as never),
  },
  guild: { id: "1234567" },
  reply: jest.fn(),
} as unknown as Message;

export const guildData = {
  _id: "1234567",
  quran: 85,
  channel: "12345678901",
  spec: "00 00",
  timezone: "Asia/Dhaka",
  prefix: "!",
};

export const csqGuildData = {
  _id: "1234567",
  quran: 85,
  channel: "12345678901",
  spec: "00 00",
  timezone: "Asia/Dhaka",
};

export const csGuildData = {
  _id: "1234567",
  channel: "12345678901",
  spec: "00 00",
  timezone: "Asia/Dhaka",
};

export const qtGuildData = {
  _id: "1234567",
  quran: 85,
  timezone: "Asia/Dhaka",
};

export const qGuildData = {
  _id: "1234567",
  quran: 85,
};

export const tGuildData = {
  _id: "1234567",
  timezone: "Asia/Dhaka",
};

export const guildDataSnap = async (
  q: boolean,
  cs: boolean,
  t: boolean,
  p = false
) =>
  ({
    val: async () =>
      cs && t && q && p
        ? guildData
        : cs && t && q
        ? csqGuildData
        : cs
        ? csGuildData
        : t
        ? tGuildData
        : q
        ? qGuildData
        : null,
  } as unknown as DataSnapshot);

export const guildDEx = {
  "Quran Translation": "haleem",
  Channel: "<#12345678901>",
  Time: "00:00",
  Timezone: "Asia/Dhaka",
  Prefix: "`!`",
};

export const csqGuildDex = {
  "Quran Translation": "haleem",
  Channel: "<#12345678901>",
  Time: "00:00",
  Timezone: "Asia/Dhaka",
  Prefix: "`!ayah `",
};

export const csGuildDex = {
  "Quran Translation": "hilali",
  Channel: "<#12345678901>",
  Time: "00:00",
  Timezone: "Asia/Dhaka",
  Prefix: "`!ayah `",
};

export const qtGuildDEx = {
  "Quran Translation": "haleem",
  Channel: "Not set",
  Time: "Not set",
  Timezone: "Asia/Dhaka",
  Prefix: "`!ayah `",
};

export const qGuildDEx = {
  "Quran Translation": "haleem",
  Channel: "Not set",
  Time: "Not set",
  Timezone: "Not set",
  Prefix: "`!ayah `",
};

export const tGuildDEx = {
  "Quran Translation": "hilali",
  Channel: "Not set",
  Time: "Not set",
  Timezone: "Asia/Dhaka",
  Prefix: "`!ayah `",
};

export const nGuildDEx = {
  "Quran Translation": "hilali",
  Channel: "Not set",
  Time: "Not set",
  Timezone: "Not set",
  Prefix: "`!ayah `",
};

export const guildId = "1234567";

export const guild = {
  id: "1234567",
} as Guild;

/* istanbul ignore next */
export const tzSnap = {
  val: async () => guildData.timezone,
} as unknown as DataSnapshot;

export const specSnap = {
  val: async () => guildData.spec,
} as unknown as DataSnapshot;

export const guildDataRaw = {
  quran: "haleem",
  channel: "12345678901",
  spec: "00 00",
  timezone: "Asia/Dhaka",
  quran2: "hilali",
};

export const channel = {
  type: "GUILD_TEXT",
  send: jest.fn(),
} as unknown as TextChannel;

export const tzChngedEmbed = new MessageEmbed({
  color: 1143554,
  title: "Timezone settings: ",
  description: "Timezone changes saved",
});

export const job = {
  reschedule: jest.fn(),
} as unknown as Job;

export const guildDExStr =
  "Quran Translation: haleem\nChannel: <#12345678901>\nTime: 00:00\nTimezone: Asia/Dhaka\nPrefix: `!`\n";

export const csqGuildDExStr =
  "Quran Translation: haleem\nChannel: <#12345678901>\nTime: 00:00\nTimezone: Asia/Dhaka\nPrefix: `!ayah `\n";

export const csGuildDExStr =
  "Quran Translation: hilali\nChannel: <#12345678901>\nTime: 00:00\nTimezone: Asia/Dhaka\nPrefix: `!ayah `\n";

export const qtGuildDExStr =
  "Quran Translation: haleem\nChannel: Not set\nTime: Not set\nTimezone: Asia/Dhaka\nPrefix: `!ayah `\n";

export const qGuildDExStr =
  "Quran Translation: haleem\nChannel: Not set\nTime: Not set\nTimezone: Not set\nPrefix: `!ayah `\n";

export const tGuildDExStr =
  "Quran Translation: hilali\nChannel: Not set\nTime: Not set\nTimezone: Asia/Dhaka\nPrefix: `!ayah `\n";

export const nGuildDExStr =
  "Quran Translation: hilali\nChannel: Not set\nTime: Not set\nTimezone: Not set\nPrefix: `!ayah `\n";

export const clientCU = {
  prefixes: {
    cache: {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    },
  },
  quranTrs: {
    cache: {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export const guildAllRaw = {
  "1234567": {
    _id: "1234567",
    quran: 85,
    channel: "12345678901",
    spec: "00 00",
    timezone: "Asia/Dhaka",
    prefix: "!",
  },
};

export const guildAllSnap = {
  val: async () => guildAllRaw,
} as unknown as DataSnapshot;
