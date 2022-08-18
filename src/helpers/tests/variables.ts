/* istanbul ignore next */

import {
  GuildBasedChannel,
  EmbedBuilder,
  ChannelType,
  PermissionResolvable,
} from "discord.js";
import { jest } from "@jest/globals";

import type { Message, Guild, TextChannel } from "discord.js";

import type { DataSnapshot } from "@firebase/database-types";
import type { Job } from "node-schedule";

export const replacerBigInt = (_, v) =>
  typeof v === "bigint" ? v.toString() : v;

export const dataInvalid = {
  lang: "en",
  code: 404,
  surah: "Not found",
  verse: undefined,
  verse_translated: "",
  translation: NaN,
  translator: "",
  verse_key: "",
  verse_key_ar: "",
};
export const dataError = {
  lang: "en",
  code: 500,
  surah: "Internal Error",
  verse: undefined,
  verse_translated: "",
  translation: NaN,
  translator: "",
  verse_key: "",
  verse_key_ar: "",
};
export const data65 = {
  lang: "en",
  code: 200,
  surah: "Surah Ash-Shu'ara (الشعراء - The Poets)",
  verse: undefined,
  verse_translated: "  And We saved Mûsâ (Moses) and all those with him.",
  translation: 203,
  translator: "Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan | Meccan",
  verse_key: "26:65",
  verse_key_ar: "",
};
export const data65Arabic = {
  lang: "ar",
  code: 200,
  surah: "سورة الشعراء",
  translation: undefined,
  translator: "",
  verse: "وَأَنجَيْنَا مُوسَىٰ وَمَن مَّعَهُۥٓ أَجْمَعِينَ",
  verse_key: "26:65",
  verse_translated: undefined,
  verse_key_ar: "۲۶:۶۵",
};
export const outputInvalid = {
  status: 404,
  error: "Ayah not found",
};
export const outputInvalidArabic = {
  verses: [],
  meta: {
    filters: {
      verse_key: "23:234",
    },
  },
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
export const output65Arabic = {
  verses: [
    {
      id: 2997,
      verse_key: "26:65",
      text_uthmani: "وَأَنجَيْنَا مُوسَىٰ وَمَن مَّعَهُۥٓ أَجْمَعِينَ",
    },
  ],
  meta: {
    filters: {
      verse_key: "26:65",
    },
  },
};
export const output66Arabic = {
  verses: [
    {
      id: 2998,
      verse_key: "26:66",
      text_uthmani: "ثُمَّ أَغْرَقْنَا ٱلْـَٔاخَرِينَ",
    },
  ],
  meta: {
    filters: {
      verse_key: "26:66",
    },
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
export const outputLongArabic = {
  verses: [
    {
      id: 289,
      verse_key: "2:282",
      text_uthmani:
        "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰٓ أَجَلٍ مُّسَمًّى فَٱكْتُبُوهُ ۚ وَلْيَكْتُب بَّيْنَكُمْ كَاتِبٌۢ بِٱلْعَدْلِ ۚ وَلَا يَأْبَ كَاتِبٌ أَن يَكْتُبَ كَمَا عَلَّمَهُ ٱللَّهُ ۚ فَلْيَكْتُبْ وَلْيُمْلِلِ ٱلَّذِى عَلَيْهِ ٱلْحَقُّ وَلْيَتَّقِ ٱللَّهَ رَبَّهُۥ وَلَا يَبْخَسْ مِنْهُ شَيْـًٔا ۚ فَإِن كَانَ ٱلَّذِى عَلَيْهِ ٱلْحَقُّ سَفِيهًا أَوْ ضَعِيفًا أَوْ لَا يَسْتَطِيعُ أَن يُمِلَّ هُوَ فَلْيُمْلِلْ وَلِيُّهُۥ بِٱلْعَدْلِ ۚ وَٱسْتَشْهِدُوا۟ شَهِيدَيْنِ مِن رِّجَالِكُمْ ۖ فَإِن لَّمْ يَكُونَا رَجُلَيْنِ فَرَجُلٌ وَٱمْرَأَتَانِ مِمَّن تَرْضَوْنَ مِنَ ٱلشُّهَدَآءِ أَن تَضِلَّ إِحْدَىٰهُمَا فَتُذَكِّرَ إِحْدَىٰهُمَا ٱلْأُخْرَىٰ ۚ وَلَا يَأْبَ ٱلشُّهَدَآءُ إِذَا مَا دُعُوا۟ ۚ وَلَا تَسْـَٔمُوٓا۟ أَن تَكْتُبُوهُ صَغِيرًا أَوْ كَبِيرًا إِلَىٰٓ أَجَلِهِۦ ۚ ذَٰلِكُمْ أَقْسَطُ عِندَ ٱللَّهِ وَأَقْوَمُ لِلشَّهَـٰدَةِ وَأَدْنَىٰٓ أَلَّا تَرْتَابُوٓا۟ ۖ إِلَّآ أَن تَكُونَ تِجَـٰرَةً حَاضِرَةً تُدِيرُونَهَا بَيْنَكُمْ فَلَيْسَ عَلَيْكُمْ جُنَاحٌ أَلَّا تَكْتُبُوهَا ۗ وَأَشْهِدُوٓا۟ إِذَا تَبَايَعْتُمْ ۚ وَلَا يُضَآرَّ كَاتِبٌ وَلَا شَهِيدٌ ۚ وَإِن تَفْعَلُوا۟ فَإِنَّهُۥ فُسُوقٌۢ بِكُمْ ۗ وَٱتَّقُوا۟ ٱللَّهَ ۖ وَيُعَلِّمُكُمُ ٱللَّهُ ۗ وَٱللَّهُ بِكُلِّ شَىْءٍ عَلِيمٌ",
    },
  ],
  meta: { filters: { verse_key: "2:282" } },
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
export const outputLong1Arabic = {
  verses: [
    {
      id: 290,
      verse_key: "2:283",
      text_uthmani:
        "۞ وَإِن كُنتُمْ عَلَىٰ سَفَرٍ وَلَمْ تَجِدُوا۟ كَاتِبًا فَرِهَـٰنٌ مَّقْبُوضَةٌ ۖ فَإِنْ أَمِنَ بَعْضُكُم بَعْضًا فَلْيُؤَدِّ ٱلَّذِى ٱؤْتُمِنَ أَمَـٰنَتَهُۥ وَلْيَتَّقِ ٱللَّهَ رَبَّهُۥ ۗ وَلَا تَكْتُمُوا۟ ٱلشَّهَـٰدَةَ ۚ وَمَن يَكْتُمْهَا فَإِنَّهُۥٓ ءَاثِمٌ قَلْبُهُۥ ۗ وَٱللَّهُ بِمَا تَعْمَلُونَ عَلِيمٌ",
    },
  ],
  meta: {
    filters: {
      verse_key: "2:283",
    },
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
export const output285Arabic = {
  verses: [
    {
      id: 292,
      verse_key: "2:285",
      text_uthmani:
        "ءَامَنَ ٱلرَّسُولُ بِمَآ أُنزِلَ إِلَيْهِ مِن رَّبِّهِۦ وَٱلْمُؤْمِنُونَ ۚ كُلٌّ ءَامَنَ بِٱللَّهِ وَمَلَـٰٓئِكَتِهِۦ وَكُتُبِهِۦ وَرُسُلِهِۦ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِۦ ۚ وَقَالُوا۟ سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ ٱلْمَصِيرُ",
    },
  ],
  meta: { filters: { verse_key: "2:285" } },
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
export const output286Arabic = {
  verses: [
    {
      id: 293,
      verse_key: "2:286",
      text_uthmani:
        "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ إِن نَّسِينَآ أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ إِصْرًا كَمَا حَمَلْتَهُۥ عَلَى ٱلَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِۦ ۖ وَٱعْفُ عَنَّا وَٱغْفِرْ لَنَا وَٱرْحَمْنَآ ۚ أَنتَ مَوْلَىٰنَا فَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَـٰفِرِينَ",
    },
  ],
  meta: {
    filters: {
      verse_key: "2:286",
    },
  },
};
export const singleEmbedShort = new EmbedBuilder({
  color: 1143554,
  title: "Surah Ash-Shu'ara (الشعراء - The Poets)",
  fields: [
    {
      name: "26:65",
      value: "  And We saved Mûsâ (Moses) and all those with him.",
    },
  ],
  footer: {
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan | Meccan",
  },
});
export const singleEmbedArabic = new EmbedBuilder({
  color: 1143554,
  title: "سورة الشعراء",
  fields: [
    {
      name: "۲۶:۶۵",
      value: "وَأَنجَيْنَا مُوسَىٰ وَمَن مَّعَهُۥٓ أَجْمَعِينَ",
    },
  ],
  footer: {
    text: undefined,
  },
});
export const singleEmbedShortMixed = new EmbedBuilder({
  color: 1143554,
  title: "Surah Ash-Shu'ara (الشعراء - The Poets)",
  fields: [
    {
      name: "۲۶:۶۵",
      value: "وَأَنجَيْنَا مُوسَىٰ وَمَن مَّعَهُۥٓ أَجْمَعِينَ",
    },
    {
      name: "26:65",
      value: "  And We saved Mûsâ (Moses) and all those with him.",
    },
  ],
  footer: {
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan | Meccan",
  },
});
export const singleEmbedShortMixedHaleem = new EmbedBuilder({
  color: 1143554,
  title: "Surah Ash-Shu'ara (الشعراء - The Poets)",
  fields: [
    {
      name: "۲۶:۶۵",
      value: "وَأَنجَيْنَا مُوسَىٰ وَمَن مَّعَهُۥٓ أَجْمَعِينَ",
    },
    {
      name: "26:65",
      value: "We saved Moses and all his companions,",
    },
  ],
  footer: {
    text: "Translation by: Abdul Haleem | Meccan",
  },
});
export const singleEmbedLong = new EmbedBuilder({
  color: 1143554,
  title: "Surah Al-Baqarah (البقرة - The Cow)",
  fields: [
    {
      name: "2:282",
      value:
        "  O you who believe! When you contract a debt for a fixed period, write it down. Let a scribe write it down in justice between you. Let not the scribe refuse to write as Allâh has taught him, so let him write. Let him (the debtor) who incurs the liability dictate, and he must fear Allâh, his Lord, and diminish not anything of what he owes. But if the debtor is of poor understanding, or weak, or is unable to dictate for himself, then let his guardian dictate in justice. And get two witnesses out of your own men. And if there are not two men (available), then a man and two women, such as you agree for witnesses, so that if one of them (two women) errs, the other can remind her. And the witnesses should not refuse when they are called (for evidence). You should not become weary to write it (your contract), whether it be small or big, for its fixed term, that is more just with Allâh; more solid as evidence, and more convenient to prevent do... ([Read more](https://quran.com/2:282?translations=203))",
    },
  ],
  footer: {
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan | Medinan",
  },
});
export const singleEmbedLongArabic = new EmbedBuilder({
  color: 1143554,
  title: "سورة البقرة",
  fields: [
    {
      name: "۲:۲۸۲",
      value:
        "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰٓ أَجَلٍ مُّسَمًّى فَٱكْتُبُوهُ ۚ وَلْيَكْتُب بَّيْنَكُمْ كَاتِبٌۢ بِٱلْعَدْلِ ۚ وَلَا يَأْبَ كَاتِبٌ أَن يَكْتُبَ كَمَا عَلَّمَهُ ٱللَّهُ ۚ فَلْيَكْتُبْ وَلْيُمْلِلِ ٱلَّذِى عَلَيْهِ ٱلْحَقُّ وَلْيَتَّقِ ٱللَّهَ رَبَّهُۥ وَلَا يَبْخَسْ مِنْهُ شَيْـًٔا ۚ فَإِن كَانَ ٱلَّذِى عَلَيْهِ ٱلْحَقُّ سَفِيهًا أَوْ ضَعِيفًا أَوْ لَا يَسْتَطِيعُ أَن يُمِلَّ هُوَ فَلْيُمْلِلْ وَلِيُّهُۥ بِٱلْعَدْلِ ۚ وَٱسْتَشْهِدُوا۟ شَهِيدَيْنِ مِن رِّجَالِكُمْ ۖ فَإِن لَّمْ يَكُونَا رَجُلَيْنِ فَرَجُلٌ وَٱمْرَأَتَانِ مِمَّن تَرْضَوْنَ مِنَ ٱلشُّهَدَآءِ أَن تَضِلَّ إِحْدَىٰهُمَا فَتُذَكِّرَ إِحْدَىٰهُمَا ٱلْأُخْرَىٰ ۚ وَلَا يَأْبَ ٱلشُّهَدَآءُ إِذَا مَا دُعُوا۟ ۚ وَلَا تَسْـَٔمُوٓا۟ أَن تَكْتُبُوهُ صَغِيرًا أَوْ كَبِيرًا إِلَىٰٓ أَجَلِهِۦ ۚ ذَٰلِكُمْ أَقْسَطُ عِندَ ٱللَّهِ وَأَقْوَمُ لِلشَّهَـٰدَةِ وَأَدْنَىٰٓ أَلَّا تَرْتَابُوٓا۟ ۖ إِلَّآ أَن تَكُونَ تِجَـٰرَةً حَاضِرَةً تُدِيرُونَهَا بَيْنَكُمْ فَلَيْسَ عَلَيْكُمْ جُنَاح  ... ([اقرأ أكثر](https://quran.com/2:282))",
    },
  ],
  footer: {
    text: undefined,
  },
});
export const singleEmbedLongMixed = new EmbedBuilder({
  color: 1143554,
  title: "Surah Al-Baqarah (البقرة - The Cow)",
  fields: [
    {
      name: "۲:۲۸۲",
      value:
        "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰٓ أَجَلٍ مُّسَمًّى فَٱكْتُبُوهُ ۚ وَلْيَكْتُب بَّيْنَكُمْ كَاتِبٌۢ بِٱلْعَدْلِ ۚ وَلَا يَأْبَ كَاتِبٌ أَن يَكْتُبَ كَمَا عَلَّمَهُ ٱللَّهُ ۚ فَلْيَكْتُبْ وَلْيُمْلِلِ ٱلَّذِى عَلَيْهِ ٱلْحَقُّ وَلْيَتَّقِ ٱللَّهَ رَبَّهُۥ وَلَا يَبْخَسْ مِنْهُ شَيْـًٔا ۚ فَإِن كَانَ ٱلَّذِى عَلَيْهِ ٱلْحَقُّ سَفِيهًا أَوْ ضَعِيفًا أَوْ لَا يَسْتَطِيعُ أَن يُمِلَّ هُوَ فَلْيُمْلِلْ وَلِيُّهُۥ بِٱلْعَدْلِ ۚ وَٱسْتَشْهِدُوا۟ شَهِيدَيْنِ مِن رِّجَالِكُمْ ۖ فَإِن لَّمْ يَكُونَا رَجُلَيْنِ فَرَجُلٌ وَٱمْرَأَتَانِ مِمَّن تَرْضَوْنَ مِنَ ٱلشُّهَدَآءِ أَن تَضِلَّ إِحْدَىٰهُمَا فَتُذَكِّرَ إِحْدَىٰهُمَا ٱلْأُخْرَىٰ ۚ وَلَا يَأْبَ ٱلشُّهَدَآءُ إِذَا مَا دُعُوا۟ ۚ وَلَا تَسْـَٔمُوٓا۟ أَن تَكْتُبُوهُ صَغِيرًا أَوْ كَبِيرًا إِلَىٰٓ أَجَلِهِۦ ۚ ذَٰلِكُمْ أَقْسَطُ عِندَ ٱللَّهِ وَأَقْوَمُ لِلشَّهَـٰدَةِ وَأَدْنَىٰٓ أَلَّا تَرْتَابُوٓا۟ ۖ إِلَّآ أَن تَكُونَ تِجَـٰرَةً حَاضِرَةً تُدِيرُونَهَا بَيْنَكُمْ فَلَيْسَ عَلَيْكُمْ جُنَاح  ... ([اقرأ أكثر](https://quran.com/2:282))",
    },
    {
      name: "2:282",
      value:
        "  O you who believe! When you contract a debt for a fixed period, write it down. Let a scribe write it down in justice between you. Let not the scribe refuse to write as Allâh has taught him, so let him write. Let him (the debtor) who incurs the liability dictate, and he must fear Allâh, his Lord, and diminish not anything of what he owes. But if the debtor is of poor understanding, or weak, or is unable to dictate for himself, then let his guardian dictate in justice. And get two witnesses out of your own men. And if there are not two men (available), then a man and two women, such as you agree for witnesses, so that if one of them (two women) errs, the other can remind her. And the witnesses should not refuse when they are called (for evidence). You should not become weary to write it (your contract), whether it be small or big, for its fixed term, that is more just with Allâh; more solid as evidence, and more convenient to prevent do... ([Read more](https://quran.com/2:282?translations=203))",
    },
  ],
  footer: {
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan | Medinan",
  },
});
export const singleEmbedHaleem = new EmbedBuilder({
  color: 1143554,
  title: "Surah Ash-Shu'ara (الشعراء - The Poets)",
  fields: [
    {
      name: "26:65",
      value: "We saved Moses and all his companions,",
    },
  ],
  footer: {
    text: "Translation by: Abdul Haleem | Meccan",
  },
});
export const multipleEmbedShort = new EmbedBuilder({
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
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan | Meccan",
  },
});
export const multipleEmbedArabic = new EmbedBuilder({
  color: 1143554,
  title: "سورة الشعراء",
  fields: [
    {
      name: "۲۶:۶۵",
      value: "وَأَنجَيْنَا مُوسَىٰ وَمَن مَّعَهُۥٓ أَجْمَعِينَ",
    },
    {
      name: "۲۶:۶۶",
      value: "ثُمَّ أَغْرَقْنَا ٱلْـَٔاخَرِينَ",
    },
  ],
  footer: {
    text: undefined,
  },
});
export const multipleEmbedShortMixed = new EmbedBuilder({
  color: 1143554,
  title: "Surah Ash-Shu'ara (الشعراء - The Poets)",
  fields: [
    {
      name: "۲۶:۶۵",
      value: "وَأَنجَيْنَا مُوسَىٰ وَمَن مَّعَهُۥٓ أَجْمَعِينَ",
    },
    {
      name: "26:65",
      value: "  And We saved Mûsâ (Moses) and all those with him.",
    },
    {
      name: "۲۶:۶۶",
      value: "ثُمَّ أَغْرَقْنَا ٱلْـَٔاخَرِينَ",
    },
    {
      name: "26:66",
      value: "    Then We drowned the others.",
    },
  ],
  footer: {
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan | Meccan",
  },
});
export const multipleEmbedShortMixedHaleem = new EmbedBuilder({
  color: 1143554,
  title: "Surah Ash-Shu'ara (الشعراء - The Poets)",
  fields: [
    {
      name: "۲۶:۶۵",
      value: "وَأَنجَيْنَا مُوسَىٰ وَمَن مَّعَهُۥٓ أَجْمَعِينَ",
    },
    {
      name: "26:65",
      value: "We saved Moses and all his companions,",
    },
    {
      name: "۲۶:۶۶",
      value: "ثُمَّ أَغْرَقْنَا ٱلْـَٔاخَرِينَ",
    },
    {
      name: "26:66",
      value: "and drowned the rest.",
    },
  ],
  footer: {
    text: "Translation by: Abdul Haleem | Meccan",
  },
});
export const multipleEmbedHaleem = new EmbedBuilder({
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
    text: "Translation by: Abdul Haleem | Meccan",
  },
});
export const multipleEmbedLong = new EmbedBuilder({
  color: 1143554,
  title: "Surah Al-Baqarah (البقرة - The Cow)",
  fields: [
    {
      name: "2:282",
      value:
        "  O you who believe! When you contract a debt for a fixed period, write it down. Let a scribe write it down in justice between you. Let not the scribe refuse to write as Allâh has taught him, so let him write. Let him (the debtor) who incurs the liability dictate, and he must fear Allâh, his Lord, and diminish not anything of what he owes. But if the debtor is of poor understanding, or weak, or is unable to dictate for himself, then let his guardian dictate in justice. And get two witnesses out of your own men. And if there are not two men (available), then a man and two women, such as you agree for witnesses, so that if one of them (two women) errs, the other can remind her. And the witnesses should not refuse when they are called (for evidence). You should not become weary to write it (your contract), whether it be small or big, for its fixed term, that is more just with Allâh; more solid as evidence, and more convenient to prevent do... ([Read more](https://quran.com/2:282?translations=203))",
    },
    {
      name: "2:283",
      value:
        " And if you are on a journey and cannot find a scribe, then let there be a pledge taken (mortgaging); then if one of you entrust the other, let the one who is entrusted discharge his trust (faithfully), and let him be afraid of Allâh, his Lord. And conceal not the evidence for he, who hides it, surely his heart is sinful. And Allâh is All-Knower of what you do.",
    },
  ],
  footer: {
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan | Medinan",
  },
});
export const multipleEmbedLongArabic = new EmbedBuilder({
  color: 1143554,
  title: "سورة البقرة",
  fields: [
    {
      name: "۲:۲۸۲",
      value:
        "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰٓ أَجَلٍ مُّسَمًّى فَٱكْتُبُوهُ ۚ وَلْيَكْتُب بَّيْنَكُمْ كَاتِبٌۢ بِٱلْعَدْلِ ۚ وَلَا يَأْبَ كَاتِبٌ أَن يَكْتُبَ كَمَا عَلَّمَهُ ٱللَّهُ ۚ فَلْيَكْتُبْ وَلْيُمْلِلِ ٱلَّذِى عَلَيْهِ ٱلْحَقُّ وَلْيَتَّقِ ٱللَّهَ رَبَّهُۥ وَلَا يَبْخَسْ مِنْهُ شَيْـًٔا ۚ فَإِن كَانَ ٱلَّذِى عَلَيْهِ ٱلْحَقُّ سَفِيهًا أَوْ ضَعِيفًا أَوْ لَا يَسْتَطِيعُ أَن يُمِلَّ هُوَ فَلْيُمْلِلْ وَلِيُّهُۥ بِٱلْعَدْلِ ۚ وَٱسْتَشْهِدُوا۟ شَهِيدَيْنِ مِن رِّجَالِكُمْ ۖ فَإِن لَّمْ يَكُونَا رَجُلَيْنِ فَرَجُلٌ وَٱمْرَأَتَانِ مِمَّن تَرْضَوْنَ مِنَ ٱلشُّهَدَآءِ أَن تَضِلَّ إِحْدَىٰهُمَا فَتُذَكِّرَ إِحْدَىٰهُمَا ٱلْأُخْرَىٰ ۚ وَلَا يَأْبَ ٱلشُّهَدَآءُ إِذَا مَا دُعُوا۟ ۚ وَلَا تَسْـَٔمُوٓا۟ أَن تَكْتُبُوهُ صَغِيرًا أَوْ كَبِيرًا إِلَىٰٓ أَجَلِهِۦ ۚ ذَٰلِكُمْ أَقْسَطُ عِندَ ٱللَّهِ وَأَقْوَمُ لِلشَّهَـٰدَةِ وَأَدْنَىٰٓ أَلَّا تَرْتَابُوٓا۟ ۖ إِلَّآ أَن تَكُونَ تِجَـٰرَةً حَاضِرَةً تُدِيرُونَهَا بَيْنَكُمْ فَلَيْسَ عَلَيْكُمْ جُنَاح  ... ([اقرأ أكثر](https://quran.com/2:282))",
    },
    {
      name: "۲:۲۸۳",
      value:
        "۞ وَإِن كُنتُمْ عَلَىٰ سَفَرٍ وَلَمْ تَجِدُوا۟ كَاتِبًا فَرِهَـٰنٌ مَّقْبُوضَةٌ ۖ فَإِنْ أَمِنَ بَعْضُكُم بَعْضًا فَلْيُؤَدِّ ٱلَّذِى ٱؤْتُمِنَ أَمَـٰنَتَهُۥ وَلْيَتَّقِ ٱللَّهَ رَبَّهُۥ ۗ وَلَا تَكْتُمُوا۟ ٱلشَّهَـٰدَةَ ۚ وَمَن يَكْتُمْهَا فَإِنَّهُۥٓ ءَاثِمٌ قَلْبُهُۥ ۗ وَٱللَّهُ بِمَا تَعْمَلُونَ عَلِيمٌ",
    },
  ],
  footer: {
    text: undefined,
  },
});
export const multipleEmbedLongMixed = new EmbedBuilder({
  color: 1143554,
  title: "Surah Al-Baqarah (البقرة - The Cow)",
  fields: [
    {
      name: "۲:۲۸۲",
      value:
        "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰٓ أَجَلٍ مُّسَمًّى فَٱكْتُبُوهُ ۚ وَلْيَكْتُب بَّيْنَكُمْ كَاتِبٌۢ بِٱلْعَدْلِ ۚ وَلَا يَأْبَ كَاتِبٌ أَن يَكْتُبَ كَمَا عَلَّمَهُ ٱللَّهُ ۚ فَلْيَكْتُبْ وَلْيُمْلِلِ ٱلَّذِى عَلَيْهِ ٱلْحَقُّ وَلْيَتَّقِ ٱللَّهَ رَبَّهُۥ وَلَا يَبْخَسْ مِنْهُ شَيْـًٔا ۚ فَإِن كَانَ ٱلَّذِى عَلَيْهِ ٱلْحَقُّ سَفِيهًا أَوْ ضَعِيفًا أَوْ لَا يَسْتَطِيعُ أَن يُمِلَّ هُوَ فَلْيُمْلِلْ وَلِيُّهُۥ بِٱلْعَدْلِ ۚ وَٱسْتَشْهِدُوا۟ شَهِيدَيْنِ مِن رِّجَالِكُمْ ۖ فَإِن لَّمْ يَكُونَا رَجُلَيْنِ فَرَجُلٌ وَٱمْرَأَتَانِ مِمَّن تَرْضَوْنَ مِنَ ٱلشُّهَدَآءِ أَن تَضِلَّ إِحْدَىٰهُمَا فَتُذَكِّرَ إِحْدَىٰهُمَا ٱلْأُخْرَىٰ ۚ وَلَا يَأْبَ ٱلشُّهَدَآءُ إِذَا مَا دُعُوا۟ ۚ وَلَا تَسْـَٔمُوٓا۟ أَن تَكْتُبُوهُ صَغِيرًا أَوْ كَبِيرًا إِلَىٰٓ أَجَلِهِۦ ۚ ذَٰلِكُمْ أَقْسَطُ عِندَ ٱللَّهِ وَأَقْوَمُ لِلشَّهَـٰدَةِ وَأَدْنَىٰٓ أَلَّا تَرْتَابُوٓا۟ ۖ إِلَّآ أَن تَكُونَ تِجَـٰرَةً حَاضِرَةً تُدِيرُونَهَا بَيْنَكُمْ فَلَيْسَ عَلَيْكُمْ جُنَاح  ... ([اقرأ أكثر](https://quran.com/2:282))",
    },
    {
      name: "2:282",
      value:
        "  O you who believe! When you contract a debt for a fixed period, write it down. Let a scribe write it down in justice between you. Let not the scribe refuse to write as Allâh has taught him, so let him write. Let him (the debtor) who incurs the liability dictate, and he must fear Allâh, his Lord, and diminish not anything of what he owes. But if the debtor is of poor understanding, or weak, or is unable to dictate for himself, then let his guardian dictate in justice. And get two witnesses out of your own men. And if there are not two men (available), then a man and two women, such as you agree for witnesses, so that if one of them (two women) errs, the other can remind her. And the witnesses should not refuse when they are called (for evidence). You should not become weary to write it (your contract), whether it be small or big, for its fixed term, that is more just with Allâh; more solid as evidence, and more convenient to prevent do... ([Read more](https://quran.com/2:282?translations=203))",
    },
    {
      name: "۲:۲۸۳",
      value:
        "۞ وَإِن كُنتُمْ عَلَىٰ سَفَرٍ وَلَمْ تَجِدُوا۟ كَاتِبًا فَرِهَـٰنٌ مَّقْبُوضَةٌ ۖ فَإِنْ أَمِنَ بَعْضُكُم بَعْضًا فَلْيُؤَدِّ ٱلَّذِى ٱؤْتُمِنَ أَمَـٰنَتَهُۥ وَلْيَتَّقِ ٱللَّهَ رَبَّهُۥ ۗ وَلَا تَكْتُمُوا۟ ٱلشَّهَـٰدَةَ ۚ وَمَن يَكْتُمْهَا فَإِنَّهُۥٓ ءَاثِمٌ قَلْبُهُۥ ۗ وَٱللَّهُ بِمَا تَعْمَلُونَ عَلِيمٌ",
    },
    {
      name: "2:283",
      value:
        " And if you are on a journey and cannot find a scribe, then let there be a pledge taken (mortgaging); then if one of you entrust the other, let the one who is entrusted discharge his trust (faithfully), and let him be afraid of Allâh, his Lord. And conceal not the evidence for he, who hides it, surely his heart is sinful. And Allâh is All-Knower of what you do.",
    },
  ],
  footer: {
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan | Medinan",
  },
});
export const multipleEmbed404First = new EmbedBuilder({
  color: 1143554,
  title: "Surah Al-Fatihah (الفاتحة - The Opener)",
  fields: [
    {
      name: "1:1",
      value: "  In the Name of Allâh, the Most Gracious, the Most Merciful",
    },
  ],
  footer: {
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan | Meccan",
  },
});

export const multipleEmbed404Last = new EmbedBuilder({
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
    text: "Translation by: Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan | Medinan",
  },
});

export const ayah404Embed = new EmbedBuilder({
  color: 16757248,
  title: "Not found",
  description: "The ayah(s) you requested doesn't exist",
  fields: [],
  footer: undefined,
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
                permissions: ["SendMessages", "ViewChannel", "EmbedLinks"],
              } as unknown as GuildBasedChannel)
            : s == "123456789012"
            ? ({
                permissions: ["SendMessages", "ViewChannel", "EmbedLinks"],
                type: ChannelType.GuildText,
              } as unknown as GuildBasedChannel)
            : ({
                permissions: [],
              } as unknown as GuildBasedChannel),
      },
    },
    members: {
      me: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        permissionsIn: (channel: any) => ({
          has: (a: PermissionResolvable) =>
            JSON.stringify(channel.permissions, replacerBigInt) ==
            JSON.stringify(a, replacerBigInt),
        }),
      },
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
  lang: "mixed",
  channel: "12345678901",
  spec: "00 00",
  timezone: "Asia/Dhaka",
  prefix: "!",
};

export const guildDFactory = (
  empty = false,
  q = false,
  cs = false,
  t = false,
  ln = false,
  p = false
) =>
  ({
    val: async () => guildDRFactory(empty, q, cs, t, ln, p),
  } as unknown as DataSnapshot);

export const guildDRFactory = (
  empty = false,
  q = false,
  cs = false,
  t = false,
  ln = false,
  p = false
) =>
  empty
    ? undefined
    : {
        _id: "1234567",
        quran: q ? 85 : undefined,
        lang: ln ? "mixed" : undefined,
        channel: cs ? "12345678901" : undefined,
        spec: cs ? "00 00" : undefined,
        timezone: t ? "Asia/Dhaka" : undefined,
        prefix: p ? "!" : undefined,
      };

export const guildDExFactory = (
  q = false,
  cs = false,
  t = false,
  ln = false,
  p = false
) => ({
  "Quran Translation": q ? "haleem" : "hilali",
  Showing: ln ? "Both translations and arabic" : "Not set",
  Channel: cs ? "<#12345678901>" : "Not set",
  Time: cs ? "00:00" : "Not set",
  Timezone: t ? "Asia/Dhaka" : "Not set",
  Prefix: p ? "`!`" : "`!ayah `",
});

export const guildDExStrFactory = (
  q = false,
  cs = false,
  t = false,
  ln = false,
  p = false
) => {
  const data = guildDExFactory(q, cs, t, ln, p);
  let dTE = "";
  for (const key in data) {
    dTE += key + `: ${data[key]}\n`;
  }
  return dTE;
};

export const guildDEx = {
  "Quran Translation": "haleem",
  "Arabic Script": "uthmani",
  Channel: "<#12345678901>",
  Time: "00:00",
  Timezone: "Asia/Dhaka",
  Prefix: "`!`",
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
  lang: "mixed",
  channel: "12345678901",
  spec: "00 00",
  timezone: "Asia/Dhaka",
  quran2: "hilali",
};

export const channel = {
  type: ChannelType.GuildText,
  send: jest.fn(),
} as unknown as TextChannel;

export const tzChngedEmbed = new EmbedBuilder({
  color: 1143554,
  title: "Timezone settings: ",
  description: "Timezone changes saved",
});

export const job = {
  reschedule: jest.fn(),
} as unknown as Job;

export const guildDExStr =
  "Quran Translation: haleem\nArabic Script: uthmani\nChannel: <#12345678901>\nTime: 00:00\nTimezone: Asia/Dhaka\nPrefix: `!`\n";

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
    lang: "mixed",
    channel: "12345678901",
    spec: "00 00",
    timezone: "Asia/Dhaka",
    prefix: "!",
  },
};

export const guildAllSnap = {
  val: async () => guildAllRaw,
} as unknown as DataSnapshot;
