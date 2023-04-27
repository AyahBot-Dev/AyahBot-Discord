/* eslint-disable no-mixed-spaces-and-tabs */
import axios from "../axiosInstance";
import { errorCodes, handleE } from "../utils";
import { colors } from "../embeds/infos";

import type {
	DataForEmbed,
	Lang,
	QuranDataRespAr,
	QuranDataRespEn,
	Verse,
	VerseAr,
} from "../../types";

export const surahsList = [
	[1, "Al-Fatihah", "الفاتحة", 7, "The Opener", "Meccan"],
	[2, "Al-Baqarah", "البقرة", 286, "The Cow", "Medinan"],
	[3, "Ali 'Imran", "آل عمران", 200, "Family of Imran", "Medinan"],
	[4, "An-Nisa", "النساء", 176, "The Women", "Medinan"],
	[5, "Al-Ma'idah", "المائدة", 120, "The Table Spread", "Medinan"],
	[6, "Al-An'am", "الأنعام", 165, "The Cattle", "Meccan"],
	[7, "Al-A'raf", "الأعراف", 206, "The Heights", "Meccan"],
	[8, "Al-Anfal", "الأنفال", 75, "The Spoils of War", "Medinan"],
	[9, "At-Tawbah", "التوبة", 129, "The Repentance", "Medinan"],
	[10, "Yunus", "يونس", 109, "Jonah", "Meccan"],
	[11, "Hud", "هود", 123, "Hud", "Meccan"],
	[12, "Yusuf", "يوسف", 111, "Joseph", "Meccan"],
	[13, "Ar-Ra'd", "الرعد", 43, "The Thunder", "Medinan"],
	[14, "Ibrahim", "ابراهيم", 52, "Abraham", "Meccan"],
	[15, "Al-Hijr", "الحجر", 99, "The Rocky Tract", "Meccan"],
	[16, "An-Nahl", "النحل", 128, "The Bee", "Meccan"],
	[17, "Al-Isra", "الإسراء", 111, "The Night Journey", "Meccan"],
	[18, "Al-Kahf", "الكهف", 110, "The Cave", "Meccan"],
	[19, "Maryam", "مريم", 98, "Mary", "Meccan"],
	[20, "Taha", "طه", 135, "Ta-Ha", "Meccan"],
	[21, "Al-Anbya", "الأنبياء", 112, "The Prophets", "Meccan"],
	[22, "Al-Hajj", "الحج", 78, "The Pilgrimage", "Medinan"],
	[23, "Al-Mu'minun", "المؤمنون", 118, "The Believers", "Meccan"],
	[24, "An-Nur", "النور", 64, "The Light", "Medinan"],
	[25, "Al-Furqan", "الفرقان", 77, "The Criterion", "Meccan"],
	[26, "Ash-Shu'ara", "الشعراء", 227, "The Poets", "Meccan"],
	[27, "An-Naml", "النمل", 93, "The Ant", "Meccan"],
	[28, "Al-Qasas", "القصص", 88, "The Stories", "Meccan"],
	[29, "Al-'Ankabut", "العنكبوت", 69, "The Spider", "Meccan"],
	[30, "Ar-Rum", "الروم", 60, "The Romans", "Meccan"],
	[31, "Luqman", "لقمان", 34, "Luqman", "Meccan"],
	[32, "As-Sajdah", "السجدة", 30, "The Prostration", "Meccan"],
	[33, "Al-Ahzab", "الأحزاب", 73, "The Combined Forces", "Medinan"],
	[34, "Saba", "سبإ", 54, "Sheba", "Meccan"],
	[35, "Fatir", "فاطر", 45, "Originator", "Meccan"],
	[36, "Ya-Sin", "يس", 83, "Ya Sin", "Meccan"],
	[37, "As-Saffat", "الصافات", 182, "Those who set the Ranks", "Meccan"],
	[38, "Sad", "ص", 88, 'The Letter "Saad"', "Meccan"],
	[39, "Az-Zumar", "الزمر", 75, "The Troops", "Meccan"],
	[40, "Ghafir", "غافر", 85, "The Forgiver", "Meccan"],
	[41, "Fussilat", "فصلت", 54, "Explained in Detail", "Meccan"],
	[42, "Ash-Shuraa", "الشورى", 53, "The Consultation", "Meccan"],
	[43, "Az-Zukhruf", "الزخرف", 89, "The Ornaments of Gold", "Meccan"],
	[44, "Ad-Dukhan", "الدخان", 59, "The Smoke", "Meccan"],
	[45, "Al-Jathiyah", "الجاثية", 37, "The Crouching", "Meccan"],
	[46, "Al-Ahqaf", "الأحقاف", 35, "The Wind-Curved Sandhills", "Meccan"],
	[47, "Muhammad", "محمد", 38, "Muhammad", "Medinan"],
	[48, "Al-Fath", "الفتح", 29, "The Victory", "Medinan"],
	[49, "Al-Hujurat", "الحجرات", 18, "The Rooms", "Medinan"],
	[50, "Qaf", "ق", 45, 'The Letter "Qaf"', "Meccan"],
	[51, "Adh-Dhariyat", "الذاريات", 60, "The Winnowing Winds", "Meccan"],
	[52, "At-Tur", "الطور", 49, "The Mount", "Meccan"],
	[53, "An-Najm", "النجم", 62, "The Star", "Meccan"],
	[54, "Al-Qamar", "القمر", 55, "The Moon", "Meccan"],
	[55, "Ar-Rahman", "الرحمن", 78, "The Beneficent", "Medinan"],
	[56, "Al-Waqi'ah", "الواقعة", 96, "The Inevitable", "Meccan"],
	[57, "Al-Hadid", "الحديد", 29, "The Iron", "Medinan"],
	[58, "Al-Mujadila", "المجادلة", 22, "The Pleading Woman", "Medinan"],
	[59, "Al-Hashr", "الحشر", 24, "The Exile", "Medinan"],
	[
		60,
		"Al-Mumtahanah",
		"الممتحنة",
		13,
		"She that is to be examined",
		"Medinan",
	],
	[61, "As-Saf", "الصف", 14, "The Ranks", "Medinan"],
	[62, "Al-Jumu'ah", "الجمعة", 11, "The Congregation, Friday", "Medinan"],
	[63, "Al-Munafiqun", "المنافقون", 11, "The Hypocrites", "Medinan"],
	[64, "At-Taghabun", "التغابن", 18, "The Mutual Disillusion", "Medinan"],
	[65, "At-Talaq", "الطلاق", 12, "The Divorce", "Medinan"],
	[66, "At-Tahrim", "التحريم", 12, "The Prohibition", "Medinan"],
	[67, "Al-Mulk", "الملك", 30, "The Sovereignty", "Meccan"],
	[68, "Al-Qalam", "القلم", 52, "The Pen", "Meccan"],
	[69, "Al-Haqqah", "الحاقة", 52, "The Reality", "Meccan"],
	[70, "Al-Ma'arij", "المعارج", 44, "The Ascending Stairways", "Meccan"],
	[71, "Nuh", "نوح", 28, "Noah", "Meccan"],
	[72, "Al-Jinn", "الجن", 28, "The Jinn", "Meccan"],
	[73, "Al-Muzzammil", "المزمل", 20, "The Enshrouded One", "Meccan"],
	[74, "Al-Muddaththir", "المدثر", 56, "The Cloaked One", "Meccan"],
	[75, "Al-Qiyamah", "القيامة", 40, "The Resurrection", "Meccan"],
	[76, "Al-Insan", "الانسان", 31, "The Man", "Medinan"],
	[77, "Al-Mursalat", "المرسلات", 50, "The Emissaries", "Meccan"],
	[78, "An-Naba", "النبإ", 40, "The Tidings", "Meccan"],
	[79, "An-Nazi'at", "النازعات", 46, "Those who drag forth", "Meccan"],
	[80, "'Abasa", "عبس", 42, "He Frowned", "Meccan"],
	[81, "At-Takwir", "التكوير", 29, "The Overthrowing", "Meccan"],
	[82, "Al-Infitar", "الإنفطار", 19, "The Cleaving", "Meccan"],
	[83, "Al-Mutaffifin", "المطففين", 36, "The Defrauding", "Meccan"],
	[84, "Al-Inshiqaq", "الإنشقاق", 25, "The Sundering", "Meccan"],
	[85, "Al-Buruj", "البروج", 22, "The Mansions of the Stars", "Meccan"],
	[86, "At-Tariq", "الطارق", 17, "The Nightcommer", "Meccan"],
	[87, "Al-A'la", "الأعلى", 19, "The Most High", "Meccan"],
	[88, "Al-Ghashiyah", "الغاشية", 26, "The Overwhelming", "Meccan"],
	[89, "Al-Fajr", "الفجر", 30, "The Dawn", "Meccan"],
	[90, "Al-Balad", "البلد", 20, "The City", "Meccan"],
	[91, "Ash-Shams", "الشمس", 15, "The Sun", "Meccan"],
	[92, "Al-Layl", "الليل", 21, "The Night", "Meccan"],
	[93, "Ad-Duhaa", "الضحى", 11, "The Morning Hours", "Meccan"],
	[94, "Ash-Sharh", "الشرح", 8, "The Relief", "Meccan"],
	[95, "At-Tin", "التين", 8, "The Fig", "Meccan"],
	[96, "Al-'Alaq", "العلق", 19, "The Clot", "Meccan"],
	[97, "Al-Qadr", "القدر", 5, "The Power", "Meccan"],
	[98, "Al-Bayyinah", "البينة", 8, "The Clear Proof", "Medinan"],
	[99, "Az-Zalzalah", "الزلزلة", 8, "The Earthquake", "Medinan"],
	[100, "Al-'Adiyat", "العاديات", 11, "The Courser", "Meccan"],
	[101, "Al-Qari'ah", "القارعة", 11, "The Calamity", "Meccan"],
	[102, "At-Takathur", "التكاثر", 8, "The Rivalry in world increase", "Meccan"],
	[103, "Al-'Asr", "العصر", 3, "The Declining Day", "Meccan"],
	[104, "Al-Humazah", "الهمزة", 9, "The Traducer", "Meccan"],
	[105, "Al-Fil", "الفيل", 5, "The Elephant", "Meccan"],
	[106, "Quraysh", "قريش", 4, "Quraysh", "Meccan"],
	[107, "Al-Ma'un", "الماعون", 7, "The Small kindnesses", "Meccan"],
	[108, "Al-Kawthar", "الكوثر", 3, "The Abundance", "Meccan"],
	[109, "Al-Kafirun", "الكافرون", 6, "The Disbelievers", "Meccan"],
	[110, "An-Nasr", "النصر", 3, "The Divine Support", "Medinan"],
	[111, "Al-Masad", "المسد", 5, "The Palm Fiber", "Meccan"],
	[112, "Al-Ikhlas", "الإخلاص", 4, "The Sincerity", "Meccan"],
	[113, "Al-Falaq", "الفلق", 5, "The Daybreak", "Meccan"],
	[114, "An-Nas", "الناس", 6, "Mankind", "Meccan"],
];

export const surah_ayah = [
	7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111,
	110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45,
	83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55,
	78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20,
	56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21,
	11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6,
];

export const translations = {
	abderrahim: 227,
	abdulhameed_kunhi: 37,
	abridged_exp_quran: 171,
	abu_adel: 79,
	abubakargumi: 32,
	abubark_khamis: 231,
	abulsalam: 118,
	abureda: 208,
	african_dev: 232,
	ahlhadith_nepal: 108,
	ahmeti: 89,
	al_hind: 151,
	al_umari: 122,
	al_umry: 225,
	albanian: 47,
	alikhan: 75,
	alimuhsin: 49,
	altai: 113,
	altay: 222,
	amroti: 238,
	apaguna: 111,
	aqwaf: 78,
	as_mokhtasar: 790,
	ayati: 74,
	aykyuni: 125,
	azerbaijani: 23,
	badkhashani: 785,
	bamoki: 143,
	baqavi: 133,
	basmeih: 39,
	bayan: 158,
	bielawski: 42,
	bn_mokhtasar: 180,
	bridges: 149,
	britch: 112,
	bs_darassalam: 214,
	bs_mokhtasar: 175,
	bubenheims_nadeem: 27,
	burhan: 81,
	cambodian_muslim: 128,
	choi: 219,
	cn_mokhtasar: 182,
	cortes: 28,
	czech: 26,
	divehi: 86,
	diyanet: 77,
	en_maududi: 95,
	en_ruwwad: 206,
	en_wahid_uddin: 823,
	es_montada: 140,
	finnish: 30,
	fr_mokhtasar: 173,
	fr_montada: 136,
	ghali: 17,
	grigore: 44,
	habibur_rahman: 120,
	haidar_kanhi: 224,
	haleem: 85,
	hamdi: 52,
	hamidullah: 31,
	hasan_abdulkarim: 221,
	hasan_efendi: 88,
	hb_darassalam: 233,
	helmi: 103,
	hilali: 203,
	hussein_taji: 29,
	id_mokhtasar: 174,
	indonesian_govt: 33,
	irving: 207,
	isa_garcia: 83,
	islamhouse: 135,
	it_mokhtasar: 176,
	jalandhari: 234,
	jan_trust: 50,
	jp_mokhtasar: 183,
	jummi: 115,
	junagarri: 54,
	kannada: 771,
	karakunnu_vanidas: 80,
	king_fahad: 134,
	king_fahad_thai: 51,
	km_mokhtasar: 792,
	knut: 48,
	korean: 36,
	korkut: 126,
	kuliev: 45,
	ma_jain: 56,
	maarif_ul_quran: 167,
	magomed: 106,
	mahmud_abduh: 46,
	makin: 109,
	mamadyjani: 796,
	mansour: 101,
	marano: 38,
	mehanovic: 25,
	mirof_mir: 139,
	ml_mokhtasar: 791,
	mujibur: 163,
	nl_abdalsalam: 235,
	noor: 199,
	norwegian: 41,
	omar_sharif: 229,
	othman_al_sharif: 209,
	piccardo: 153,
	pickthall: 19,
	pioneers: 223,
	pr_mokhtasar: 181,
	ramdane: 236,
	rashidmaash: 779,
	rawai: 162,
	roman_islamic_league: 782,
	ru_mokhtasar: 178,
	rwanda: 774,
	ryoichi: 35,
	sabiq: 141,
	sadiq_sani: 87,
	sahih: 20,
	saleh: 76,
	samir: 43,
	sato: 218,
	sayyid_qutb: 156,
	sh_ruwwad: 228,
	shafii_ansari: 226,
	shahin: 124,
	silika: 798,
	siregar: 144,
	society_ins_uni: 230,
	sodik: 127,
	sodiq: 55,
	sp_mokhtasar: 776,
	sulimankanti: 795,
	taisirul: 161,
	taqiusmani: 84,
	tatar: 53,
	theclearquran: 131,
	theophanov: 237,
	tl_darassalam: 211,
	tl_mokhtasar: 179,
	tr_darassalam: 210,
	tr_mokhtasar: 172,
	transliteration: 57,
	ur_maududi: 97,
	ur_wahid_uddin: 819,
	vn_mokhtasar: 177,
	vn_ruwwad: 220,
	yaqubovic: 217,
	yusufali: 22,
	zakaria: 213,
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
	"172": "tr_mokhtasar",
	"173": "fr_mokhtasar",
	"174": "id_mokhtasar",
	"175": "bs_mokhtasar",
	"176": "it_mokhtasar",
	"177": "vn_mokhtasar",
	"178": "ru_mokhtasar",
	"179": "tl_mokhtasar",
	"180": "bn_mokhtasar",
	"181": "pr_mokhtasar",
	"182": "cn_mokhtasar",
	"183": "jp_mokhtasar",
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
	"771": "kannada",
	"774": "rwanda",
	"776": "sp_mokhtasar",
	"779": "rashidmaash",
	"782": "roman_islamic_league",
	"785": "badkhashani",
	"790": "as_mokhtasar",
	"791": "ml_mokhtasar",
	"792": "km_mokhtasar",
	"795": "sulimankanti",
	"796": "mamadyjani",
	"798": "silika",
	"819": "ur_wahid_uddin",
	"823": "en_wahid_uddin",
};

export const arabicDigits = {
	0: "\u06f0",
	1: "\u06f1",
	2: "\u06f2",
	3: "\u06f3",
	4: "\u06f4",
	5: "\u06f5",
	6: "\u06f6",
	7: "\u06f7",
	8: "\u06f8",
	9: "\u06f9",
	":": ":",
};

export const sanitizeVerse = async (surah_ind: number, verse: string) => {
	if (!surah_ayah[surah_ind]) return errorCodes.INVALID_SURAH;
	const [start, end] = verse.split("-").map(Number);
	if (!start || Number.isNaN(end)) return errorCodes.INVALID_VERSE;
	if (start > surah_ayah[surah_ind] || end > surah_ayah[surah_ind])
		return errorCodes.INVALID_VERSE;
	if (start < 1 || end < 1 || end < start) return errorCodes.INVALID_VERSE;
	return 0;
};

/* Class: Ayah */
export class Ayah {
	private _code: number;

	private _verse_key: string;
	private _verse_key_ar: string;
	private _translation: number;
	private _verse: string;
	private _verse_translated: string;
	private _surah: string;
	private _translator: string;
	private _lang: string;

	private _isForDaily: boolean;

	constructor(
		verse_key: string,
		translation_code: string | number,
		daily = false,
		lang: Lang = "en"
	) {
		this._verse_key = verse_key;
		this._translation =
			lang != "ar"
				? translation_code
					? typeof translation_code == "string"
						? translations[translation_code]
						: translation_code
					: 203
				: undefined;
		this._lang = lang;
		this._isForDaily = daily;
		this._verse_key_ar = "";
	}

	get code() {
		return this._code;
	}
	/*istanbul ignore next */
	get verse_key() {
		return this._verse_key; /*istanbul ignore next */
	}

	get verse_key_ar() {
		return this._verse_key_ar; /*istanbul ignore next */
	}

	get translation() {
		return this._translation;
	}

	get verse() {
		return this._verse;
	}

	get verse_translated() {
		return this._verse_translated;
	}
	/*istanbul ignore next */
	get surah() {
		return this._surah; /*istanbul ignore next */
	}

	get translator() {
		return this._translator;
	}

	get lang() {
		return this._lang;
	}

	public static async fetch(
		/* istanbul ignore next */
		verse_key: string,
		translation: string | number = undefined,
		lang: Lang = undefined
	): Promise<Ayah | Ayah[]> {
		if (verse_key.split("-").length == 1)
			return await new Ayah(verse_key, translation, false, lang).init();
		else {
			const [surah, verseRange] = verse_key.split(":");
			// eslint-disable-next-line prefer-const
			let [start, end] = verseRange.split("-").map(Number);
			const limit = lang == "mixed" || lang == "ar" ? 7 : 14;
			if (end - start > limit) {
				end = start + limit;
			}
			const verseArray = Array.from(
				{ length: end - start + 1 },
				(_, i) => `${surah}:${start + i}`
			);
			const ayahs = [];
			for (const v of verseArray) {
				const ayah = await new Ayah(v, translation, false, lang).init();
				ayahs.push(ayah);
			}
			return ayahs;
		}
	}

	public static async random(
		translation: string | number = undefined,
		daily = false,
		lang: Lang = undefined
	): Promise<Ayah> {
		const surah = Math.floor(Math.random() * 114 + 1);
		const ayah = Math.floor(Math.random() * surah_ayah[surah - 1] + 1);
		return await new Ayah(`${surah}:${ayah}`, translation, daily, lang).init();
	}

	private async init(): Promise<Ayah> {
		this._lang != "en" ? await this.fetchAyahAr() : await this.fetchAyahEn();
		this._lang == "mixed" ? await this.fetchAyahEn() : null;
		return this;
	}

	private async assignDataEn(data: Verse, code: number): Promise<boolean> {
		return new Promise((resolve) => {
			this._code = code;
			if (code == 200) {
				this._surah = `Surah ${surahsList[data.chapter_id - 1][1]} (${
					surahsList[data.chapter_id - 1][2]
				} - ${surahsList[data.chapter_id - 1][4]})`;
				this._verse_translated = data.translations[0].text.replaceAll(
					/<+?[^<]+?>\d*/g,
					""
				);
				this._translator = `${data.translations[0].resource_name} | ${
					surahsList[data.chapter_id - 1][5]
				}`;
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

	private async assignDataAr(data: VerseAr, code: number): Promise<boolean> {
		return new Promise((resolve) => {
			this._code = data ? 200 : code == 500 ? 500 : 404;
			if (this._code == 200) {
				this._surah = `سورة ${
					surahsList[Number(this._verse_key.split(":")[0]) - 1][2]
				}`;
				this._verse = data.text_uthmani;
				this._translator = this._translation ? this._translator : "";
				for (let i = 0; i < data.verse_key.length; i++)
					this._verse_key_ar += arabicDigits[data.verse_key[i]];
			} else {
				this._surah = !data && code != 500 ? "Not found" : "Internal Error";
				this._verse = "";
				this._translator = "";
				this._lang = "";
				this._verse_key = "";
				this._verse_key_ar = "";
			}

			resolve(true);
		});
	}

	public async exportData(): Promise<Record<string, string | number>> {
		return new Promise((resolve) => {
			resolve({
				code: this._code,
				verse_key: this._verse_key,
				verse_key_ar: this._verse_key_ar,
				translation: this._translation,
				lang: this._lang,
				verse: this._verse,
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
					title: this._isForDaily
						? this._translation
							? "Ayah of the day"
							: "آية اليوم"
						: this._surah,
					fields: [
						this._lang != "en"
							? {
									name: this._isForDaily ? this._surah : this._verse_key_ar,
									value:
										this._verse.length >= 980
											? this._verse.substring(0, 980) +
											  `  ... ([اقرأ أكثر](https://quran.com/${this._verse_key}))`
											: this._isForDaily
											? this._verse + ` [${this._verse_key_ar}]`
											: this._verse,
							  }
							: undefined,
						this._lang != "ar"
							? {
									name: this._isForDaily
										? this._lang == "mixed"
											? "Translation:"
											: this._surah
										: this._verse_key,
									value:
										this._verse_translated.length >= 950
											? this._verse_translated.substring(0, 950) +
											  `... ([Read more](https://quran.com/${this._verse_key}?translations=${this._translation}))`
											: this._isForDaily
											? this._verse_translated + ` [${this._verse_key}]`
											: this._verse_translated,
							  }
							: undefined,
					],
					footer: {
						text: this._translator
							? `Translation by: ${this._translator}`
							: undefined,
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
	private async fetchAyahEn(): Promise<string | void | boolean> {
		const url = `https://api.qurancdn.com/api/qdc/verses/by_key/${this.verse_key}?translations=${this.translation}&translation_fields=resource_name&fields=chapter_id`;

		return await axios
			.get(url)
			.then(async (resp) => [await resp.data, await resp.status])
			.then(async (data: [QuranDataRespEn, number]) => {
				await this.assignDataEn(data[0].verse, data[1]);
				return true;
			})
			.catch(async (e) => {
				await this.assignDataEn(undefined, 500);
				await handleE(e, "fetchAyahEn()");
				return;
			});
	}

	private async fetchAyahAr(): Promise<string | void | boolean> {
		const url = `https://api.qurancdn.com/api/qdc/quran/verses/uthmani?verse_key=${this._verse_key}`;

		return await axios
			.get(url)
			.then(async (resp) => [await resp.data, await resp.status])
			.then(async (data: [QuranDataRespAr, number]) => {
				await this.assignDataAr(data[0].verses[0], data[1]);
				return true;
			})
			.catch(async (e) => {
				await this.assignDataAr(undefined, 500);
				await handleE(e, "fetchAyahAr()");
				return;
			});
	}
}
