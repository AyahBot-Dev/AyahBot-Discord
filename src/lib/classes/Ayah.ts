import axios from "../axiosInstance.js";
import { handleE } from "../utils.js";
import { colors } from "../embeds/infos.js";

import type { DataForEmbed, QuranDataResp, Verse } from "../../types";

export const surahsList = [
  "Surah Al-Fatihah (الفاتحة - The Opener)",
  "Surah Al-Baqarah (البقرة - The Cow)",
  "Surah Ali 'Imran (آل عمران - Family of Imran)",
  "Surah An-Nisa (النساء - The Women)",
  "Surah Al-Ma'idah (المائدة - The Table Spread)",
  "Surah Al-An'am (الأنعام - The Cattle)",
  "Surah Al-A'raf (الأعراف - The Heights)",
  "Surah Al-Anfal (الأنفال - The Spoils of War)",
  "Surah At-Tawbah (التوبة - The Repentance)",
  "Surah Yunus (يونس - Jonah)",
  "Surah Hud (هود - Hud)",
  "Surah Yusuf (يوسف - Joseph)",
  "Surah Ar-Ra'd (الرعد - The Thunder)",
  "Surah Ibrahim (ابراهيم - Abraham)",
  "Surah Al-Hijr (الحجر - The Rocky Tract)",
  "Surah An-Nahl (النحل - The Bee)",
  "Surah Al-Isra (الإسراء - The Night Journey)",
  "Surah Al-Kahf (الكهف - The Cave)",
  "Surah Maryam (مريم - Mary)",
  "Surah Taha (طه - Ta-Ha)",
  "Surah Al-Anbya (الأنبياء - The Prophets)",
  "Surah Al-Hajj (الحج - The Pilgrimage)",
  "Surah Al-Mu'minun (المؤمنون - The Believers)",
  "Surah An-Nur (النور - The Light)",
  "Surah Al-Furqan (الفرقان - The Criterion)",
  "Surah Ash-Shu'ara (الشعراء - The Poets)",
  "Surah An-Naml (النمل - The Ant)",
  "Surah Al-Qasas (القصص - The Stories)",
  "Surah Al-'Ankabut (العنكبوت - The Spider)",
  "Surah Ar-Rum (الروم - The Romans)",
  "Surah Luqman (لقمان - Luqman)",
  "Surah As-Sajdah (السجدة - The Prostration)",
  "Surah Al-Ahzab (الأحزاب - The Combined Forces)",
  "Surah Saba (سبإ - Sheba)",
  "Surah Fatir (فاطر - Originator)",
  "Surah Ya-Sin (يس - Ya Sin)",
  "Surah As-Saffat (الصافات - Those who set the Ranks)",
  'Surah Sad (ص - The Letter "Saad")',
  "Surah Az-Zumar (الزمر - The Troops)",
  "Surah Ghafir (غافر - The Forgiver)",
  "Surah Fussilat (فصلت - Explained in Detail)",
  "Surah Ash-Shuraa (الشورى - The Consultation)",
  "Surah Az-Zukhruf (الزخرف - The Ornaments of Gold)",
  "Surah Ad-Dukhan (الدخان - The Smoke)",
  "Surah Al-Jathiyah (الجاثية - The Crouching)",
  "Surah Al-Ahqaf (الأحقاف - The Wind-Curved Sandhills)",
  "Surah Muhammad (محمد - Muhammad)",
  "Surah Al-Fath (الفتح - The Victory)",
  "Surah Al-Hujurat (الحجرات - The Rooms)",
  'Surah Qaf (ق - The Letter "Qaf")',
  "Surah Adh-Dhariyat (الذاريات - The Winnowing Winds)",
  "Surah At-Tur (الطور - The Mount)",
  "Surah An-Najm (النجم - The Star)",
  "Surah Al-Qamar (القمر - The Moon)",
  "Surah Ar-Rahman (الرحمن - The Beneficent)",
  "Surah Al-Waqi'ah (الواقعة - The Inevitable)",
  "Surah Al-Hadid (الحديد - The Iron)",
  "Surah Al-Mujadila (المجادلة - The Pleading Woman)",
  "Surah Al-Hashr (الحشر - The Exile)",
  "Surah Al-Mumtahanah (الممتحنة - She that is to be examined)",
  "Surah As-Saf (الصف - The Ranks)",
  "Surah Al-Jumu'ah (الجمعة - The Congregation, Friday)",
  "Surah Al-Munafiqun (المنافقون - The Hypocrites)",
  "Surah At-Taghabun (التغابن - The Mutual Disillusion)",
  "Surah At-Talaq (الطلاق - The Divorce)",
  "Surah At-Tahrim (التحريم - The Prohibition)",
  "Surah Al-Mulk (الملك - The Sovereignty)",
  "Surah Al-Qalam (القلم - The Pen)",
  "Surah Al-Haqqah (الحاقة - The Reality)",
  "Surah Al-Ma'arij (المعارج - The Ascending Stairways)",
  "Surah Nuh (نوح - Noah)",
  "Surah Al-Jinn (الجن - The Jinn)",
  "Surah Al-Muzzammil (المزمل - The Enshrouded One)",
  "Surah Al-Muddaththir (المدثر - The Cloaked One)",
  "Surah Al-Qiyamah (القيامة - The Resurrection)",
  "Surah Al-Insan (الانسان - The Man)",
  "Surah Al-Mursalat (المرسلات - The Emissaries)",
  "Surah An-Naba (النبإ - The Tidings)",
  "Surah An-Nazi'at (النازعات - Those who drag forth)",
  "Surah 'Abasa (عبس - He Frowned)",
  "Surah At-Takwir (التكوير - The Overthrowing)",
  "Surah Al-Infitar (الإنفطار - The Cleaving)",
  "Surah Al-Mutaffifin (المطففين - The Defrauding)",
  "Surah Al-Inshiqaq (الإنشقاق - The Sundering)",
  "Surah Al-Buruj (البروج - The Mansions of the Stars)",
  "Surah At-Tariq (الطارق - The Nightcommer)",
  "Surah Al-A'la (الأعلى - The Most High)",
  "Surah Al-Ghashiyah (الغاشية - The Overwhelming)",
  "Surah Al-Fajr (الفجر - The Dawn)",
  "Surah Al-Balad (البلد - The City)",
  "Surah Ash-Shams (الشمس - The Sun)",
  "Surah Al-Layl (الليل - The Night)",
  "Surah Ad-Duhaa (الضحى - The Morning Hours)",
  "Surah Ash-Sharh (الشرح - The Relief)",
  "Surah At-Tin (التين - The Fig)",
  "Surah Al-'Alaq (العلق - The Clot)",
  "Surah Al-Qadr (القدر - The Power)",
  "Surah Al-Bayyinah (البينة - The Clear Proof)",
  "Surah Az-Zalzalah (الزلزلة - The Earthquake)",
  "Surah Al-'Adiyat (العاديات - The Courser)",
  "Surah Al-Qari'ah (القارعة - The Calamity)",
  "Surah At-Takathur (التكاثر - The Rivalry in world increase)",
  "Surah Al-'Asr (العصر - The Declining Day)",
  "Surah Al-Humazah (الهمزة - The Traducer)",
  "Surah Al-Fil (الفيل - The Elephant)",
  "Surah Quraysh (قريش - Quraysh)",
  "Surah Al-Ma'un (الماعون - The Small kindnesses)",
  "Surah Al-Kawthar (الكوثر - The Abundance)",
  "Surah Al-Kafirun (الكافرون - The Disbelievers)",
  "Surah An-Nasr (النصر - The Divine Support)",
  "Surah Al-Masad (المسد - The Palm Fiber)",
  "Surah Al-Ikhlas (الإخلاص - The Sincerity)",
  "Surah Al-Falaq (الفلق - The Daybreak)",
  "Surah An-Nas (الناس - Mankind)",
];

export const translations = {
  ghali: 17,
  pickthall: 19,
  sahih: 20,
  yusufali: 22,
  azerbaijani: 23,
  mehanovic: 25,
  czech: 26,
  bubenheims_nadeem: 27,
  cortes: 28,
  hussein_taji: 29,
  finnish: 30,
  hamidullah: 31,
  abubakargumi: 32,
  indonesian_govt: 33,
  ryoichi: 35,
  korean: 36,
  abdulhameed_kunhi: 37,
  marano: 38,
  basmeih: 39,
  norwegian: 41,
  bielawski: 42,
  samir: 43,
  grigore: 44,
  kuliev: 45,
  mahmud_abduh: 46,
  albanian: 47,
  knut: 48,
  alimuhsin: 49,
  jan_trust: 50,
  king_fahad_thai: 51,
  hamdi: 52,
  tatar: 53,
  junagarri: 54,
  sodiq: 55,
  ma_jain: 56,
  transliteration: 57,
  ayati: 74,
  alikhan: 75,
  saleh: 76,
  diyanet: 77,
  aqwaf: 78,
  abu_adel: 79,
  karakunnu_vanidas: 80,
  burhan: 81,
  isa_garcia: 83,
  taqiusmani: 84,
  haleem: 85,
  divehi: 86,
  sadiq_sani: 87,
  hasan_efendi: 88,
  ahmeti: 89,
  en_maududi: 95,
  ur_maududi: 97,
  mansour: 101,
  helmi: 103,
  magomed: 106,
  ahlhadith_nepal: 108,
  makin: 109,
  apaguna: 111,
  britch: 112,
  altai: 113,
  jummi: 115,
  abulsalam: 118,
  habibur_rahman: 120,
  al_umari: 122,
  shahin: 124,
  aykyuni: 125,
  korkut: 126,
  sodik: 127,
  cambodian_muslim: 128,
  theclearquran: 131,
  baqavi: 133,
  king_fahad: 134,
  islamhouse: 135,
  fr_montada: 136,
  mirof_mir: 139,
  es_montada: 140,
  sabiq: 141,
  bamoki: 143,
  siregar: 144,
  bridges: 149,
  al_hind: 151,
  piccardo: 153,
  sayyid_qutb: 156,
  bayan: 158,
  taisirul: 161,
  rawai: 162,
  mujibur: 163,
  maarif_ul_quran: 167,
  abridged_exp_quran: 171,
  tr_mukhtasar: 172,
  fr_mukhtasar: 173,
  id_mukhtasar: 174,
  bs_mukhtasar: 175,
  it_mukhtasar: 176,
  vn_mukhtasar: 177,
  ru_mukhtasar: 178,
  tl_mukhtasar: 179,
  bn_mukhtasar: 180,
  pr_mukhtasar: 181,
  cn_mukhtasar: 182,
  jp_mukhtasar: 183,
  noor: 199,
  hilali: 203,
  en_ruwwad: 206,
  irving: 207,
  abureda: 208,
  othman_al_sharif: 209,
  tr_darassalam: 210,
  tl_darassalam: 211,
  zakaria: 213,
  bs_darassalam: 214,
  yaqubovic: 217,
  sato: 218,
  choi: 219,
  vn_ruwwad: 220,
  hasan_abdulkarim: 221,
  altay: 222,
  pioneers: 223,
  haidar_kanhi: 224,
  al_umry: 225,
  shafii_ansari: 226,
  abderrahim: 227,
  sh_ruwwad: 228,
  omar_sharif: 229,
  society_ins_uni: 230,
  abubark_khamis: 231,
  african_dev: 232,
  hb_darassalam: 233,
  jalandhari: 234,
  nl_abdalsalam: 235,
  ramdane: 236,
  theophanov: 237,
  amroti: 238,
};

export const translationsR = {
  "17": "ghali",
  "19": "pickthall",
  "20": "sahih",
  "22": "yusufali",
  "23": "azerbaijani",
  "25": "mehanovic",
  "26": "czech",
  "27": "bubenheims_nadeem",
  "28": "cortes",
  "29": "hussein_taji",
  "30": "finnish",
  "31": "hamidullah",
  "32": "abubakargumi",
  "33": "indonesian_govt",
  "35": "ryoichi",
  "36": "korean",
  "37": "abdulhameed_kunhi",
  "38": "marano",
  "39": "basmeih",
  "41": "norwegian",
  "42": "bielawski",
  "43": "samir",
  "44": "grigore",
  "45": "kuliev",
  "46": "mahmud_abduh",
  "47": "albanian",
  "48": "knut",
  "49": "alimuhsin",
  "50": "jan_trust",
  "51": "king_fahad_thai",
  "52": "hamdi",
  "53": "tatar",
  "54": "junagarri",
  "55": "sodiq",
  "56": "ma_jain",
  "57": "transliteration",
  "74": "ayati",
  "75": "alikhan",
  "76": "saleh",
  "77": "diyanet",
  "78": "aqwaf",
  "79": "abu_adel",
  "80": "karakunnu_vanidas",
  "81": "burhan",
  "83": "isa_garcia",
  "84": "taqiusmani",
  "85": "haleem",
  "86": "divehi",
  "87": "sadiq_sani",
  "88": "hasan_efendi",
  "89": "ahmeti",
  "95": "en_maududi",
  "97": "ur_maududi",
  "101": "mansour",
  "103": "helmi",
  "106": "magomed",
  "108": "ahlhadith_nepal",
  "109": "makin",
  "111": "apaguna",
  "112": "britch",
  "113": "altai",
  "115": "jummi",
  "118": "abulsalam",
  "120": "habibur_rahman",
  "122": "al_umari",
  "124": "shahin",
  "125": "aykyuni",
  "126": "korkut",
  "127": "sodik",
  "128": "cambodian_muslim",
  "131": "theclearquran",
  "133": "baqavi",
  "134": "king_fahad",
  "135": "islamhouse",
  "136": "fr_montada",
  "139": "mirof_mir",
  "140": "es_montada",
  "141": "sabiq",
  "143": "bamoki",
  "144": "siregar",
  "149": "bridges",
  "151": "al_hind",
  "153": "piccardo",
  "156": "sayyid_qutb",
  "158": "bayan",
  "161": "taisirul",
  "162": "rawai",
  "163": "mujibur",
  "167": "maarif_ul_quran",
  "171": "abridged_exp_quran",
  "172": "tr_mukhtasar",
  "173": "fr_mukhtasar",
  "174": "id_mukhtasar",
  "175": "bs_mukhtasar",
  "176": "it_mukhtasar",
  "177": "vn_mukhtasar",
  "178": "ru_mukhtasar",
  "179": "tl_mukhtasar",
  "180": "bn_mukhtasar",
  "181": "pr_mukhtasar",
  "182": "cn_mukhtasar",
  "183": "jp_mukhtasar",
  "199": "noor",
  "203": "hilali",
  "206": "en_ruwwad",
  "207": "irving",
  "208": "abureda",
  "209": "othman_al_sharif",
  "210": "tr_darassalam",
  "211": "tl_darassalam",
  "213": "zakaria",
  "214": "bs_darassalam",
  "217": "yaqubovic",
  "218": "sato",
  "219": "choi",
  "220": "vn_ruwwad",
  "221": "hasan_abdulkarim",
  "222": "altay",
  "223": "pioneers",
  "224": "haidar_kanhi",
  "225": "al_umry",
  "226": "shafii_ansari",
  "227": "abderrahim",
  "228": "sh_ruwwad",
  "229": "omar_sharif",
  "230": "society_ins_uni",
  "231": "abubark_khamis",
  "232": "african_dev",
  "233": "hb_darassalam",
  "234": "jalandhari",
  "235": "nl_abdalsalam",
  "236": "ramdane",
  "237": "theophanov",
  "238": "amroti",
};

export class Ayah {
  private _code: number;
  private _verse_key: string;
  private _translation: number;
  private _verse_translated: string;
  private _surah: string;
  private _translator: string;

  private _isRandom: boolean;
  private _isForDaily: boolean;

  constructor(
    verse_key: string,
    translation_code: string | number,
    random = false,
    daily = false
  ) {
    this._verse_key = verse_key;
    this._translation =
      typeof translation_code == "string"
        ? translations[translation_code]
        : translation_code;
    this._isRandom = random;
    this._isForDaily = daily;
  }

  get code() {
    return this._code;
  }

  get verse_key() {
    return this._verse_key;
  }

  get translation() {
    return this._translation;
  }

  get verse_translated() {
    return this._verse_translated;
  }

  get surah() {
    return this._surah;
  }

  get translator() {
    return this._translator;
  }

  public static async fetch(
    /* istanbul ignore next */
    verse_key: string,
    translation: string | number = 203
  ): Promise<Ayah | Ayah[]> {
    if (verse_key.split("-").length == 1)
      return await new Ayah(verse_key, translation).init();
    else {
      const [surah, verseRange] = verse_key.split(":");
      const [start, end] = verseRange.split("-").map((x) => parseInt(x));
      const verseArray = Array.from(
        { length: end - start + 1 },
        (_, i) => `${surah}:${start + i}`
      );
      const ayahs = [];
      for (const v of verseArray) {
        const ayah = await new Ayah(v, translation).init();
        ayahs.push(ayah);
      }
      return ayahs;
    }
  }

  public static async random(
    translation: string | number = 203,
    daily = false
  ): Promise<Ayah> {
    return await new Ayah(undefined, translation, true, daily).init();
  }

  private async init(): Promise<Ayah> {
    await this.fetchAyah(this._isRandom);
    return this;
  }

  private async assignData(data: Verse, code: number): Promise<boolean> {
    return new Promise((resolve) => {
      this._code = code;
      if (code == 200) {
        this._surah = surahsList[data.chapter_id - 1];
        this._verse_translated = data.translations[0].text.replace(
          /<sup.*>.*<\/sup>/,
          ""
        );
        this._translator = data.translations[0].resource_name;
        this._verse_key = data.verse_key;
      } else {
        this._surah = code == 404 ? "Not found" : "Internal Error";
        this._verse_translated = "";
        this._translator = "";
        this._translation = NaN;
        this._verse_key = "";
      }

      resolve(true);
    });
  }

  public async exportData(): Promise<Record<string, string | number>> {
    return new Promise((resolve) => {
      resolve({
        code: this._code,
        verse_key: this._verse_key,
        translation: this._translation,
        verse_translated: this._verse_translated,
        surah: this._surah,
        translator: this._translator,
      });
    });
  }

  public async exportDataForEmbed(): Promise<DataForEmbed> {
    return new Promise((resolve) => {
      if (this._code == 200) {
        resolve({
          title: this._isForDaily ? "Ayah of the day" : this._surah,
          field: {
            name: this._isForDaily ? this._surah : this._verse_key,
            value:
              this._verse_translated.length >= 980
                ? this._verse_translated.substring(0, 980) +
                  `... ([Read more](https://quran.com/${this._verse_key}))`
                : this._isForDaily
                ? this._verse_translated + ` [${this._verse_key}]`
                : this._verse_translated,
          },
          footer: {
            text: `Translation by: ${this._translator}`,
          },
        });
      } else {
        resolve({
          color: this._code == 404 ? colors.warning : undefined,
          title: this._surah,
          description:
            this._code == 404
              ? "The ayah(s) you requested doesn't exist"
              : "SERVER_ERR",
        });
      }
    });
  }

  /* istanbul ignore next */
  private async fetchAyah(random = false): Promise<string | void | boolean> {
    const url = random
      ? `https://api.qurancdn.com/api/qdc/verses/random?translations=${this.translation}&translation_fields=resource_name&fields=chapter_id`
      : `https://api.qurancdn.com/api/qdc/verses/by_key/${this.verse_key}?translations=${this.translation}&translation_fields=resource_name&fields=chapter_id`;

    return await axios
      .get(url)
      .then(async (resp) => [await resp.data, await resp.status])
      .then(async (data: [QuranDataResp, number]) => {
        await this.assignData(data[0].verse, data[1]);
        return true;
      })
      .catch(async (e) => {
        await this.assignData(undefined, 500);
        await handleE(e, "fetchAyah()");
        return;
      });
  }
}
