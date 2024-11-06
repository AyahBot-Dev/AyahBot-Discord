import axios from "../src/lib/axiosInstance";
import { transport } from "../src/lib/utils";
import { translations } from "../src/lib/classes/Ayah";

const notifyUpdate = async (text: string): Promise<boolean> => {
	const message = {
		from: `AyahBot Mailer <${process.env.SENDER_MAIL}>`,
		to: process.env.RECEIVER_MAIL,
		subject: "Translations array needs an update",
		text: text,
		html: text,
	};
	return await transport
		.sendMail(message)
		.then(async () => {
			return true;
		})
		.catch((err) => {(console.error(err)); process.exit(1)});
};

let text = ""

const translationsArr = Object.values(translations);

const url = "https://api.quran.com/api/v4/resources/translations";

const translationsdTC = (await axios.get(url)).data?.translations as Array<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Record<string, any>
>;

translationsdTC.sort((a, b) => a.id - b.id);
translationsArr.sort((a, b) => a - b);

// check the length first:
if (translationsdTC.length != translationsArr.length) {
	text += "Length doesn't match";
	text += `AyahBot: ${translationsArr.length}, Original: ${translationsdTC.length}`
	await new Promise((r) => setTimeout(r, 3000));
}

// then iterate if all ok
await translationsdTC.forEach(async (v, i) => {
	if (v.id != translationsArr[i] || !translationsArr[i]) {
		text += '\n' + 
			`So, in index ${i}, translations list (online) has ${v.id}, but we have ${translationsArr[i]}\n`
		
		await new Promise((r) => setTimeout(r, 3000));
	}
	i == translationsdTC.length - 1 ? process.exit(0) : null;
});

console.log(text)