import { writeFile } from "fs/promises";

import axios from "../src/lib/axiosInstance";
import { translationsR } from "../src/lib/classes/Ayah";

const url = "https://api.quran.com/api/v4/resources/translations";

let translationsdTC = (await axios.get(url)).data?.translations as Array<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, any>
>;

const languages: string[] = [];

let string = "";

translationsdTC = translationsdTC.filter((a) => translationsR[a.id + ""]);

translationsdTC.forEach(
  (v) =>
    !(languages.indexOf(v.language_name) + 1) && languages.push(v.language_name)
);

languages.sort((a, b) => a.localeCompare(b));

languages.forEach((v) => {
  string += `**${v[0].toUpperCase() + v.slice(1)}**\n\n`;
  translationsdTC
    .filter((a) => a.language_name == v)
    .forEach((v) => {
      if (!v) return;
      string += `• \`${translationsR[v.id + ""]}\` - Translation by: ${
        v.name
      }\n`;
    });
  string += "\n";
});

string += `\nAuto generated on: ${new Date().toString()}`;
await writeFile("./wiki/Translations.md", string);
process.exit();
