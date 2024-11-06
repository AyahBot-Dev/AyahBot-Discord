import { writeFile } from "fs/promises";
import {Country, getAllCountries} from "countries-and-timezones";

const tzData = await getAllCountries();

let string = "";

for (const c in tzData) {
  const data: Country = tzData[c];
  string += `### ${data.name} (Country code: '${c}')\n\n`;
  data.timezones.forEach((v) => (string += `- \`${v}\`\n`));
  string += "\n";
}

string += `\nAuto generated on: ${new Date().toString()}`;
await writeFile("./Timezones.md", string);
process.exit();
