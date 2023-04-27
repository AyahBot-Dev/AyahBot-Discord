/*istanbul ignore next */
import * as fs from "fs/promises";

import type { CustomClient } from "../classes/CustomClient";

/* istanbul ignore next */
export default async (client: CustomClient) => {
	console.time("Time taken");
	/* istanbul ignore next */
	const events_files = await fs.readdir(`./src/events/`).then(async (files) =>
		files.filter(
			(file) =>
				file.endsWith(process.env.NODE_ENV == "production" ? ".js" : ".ts")
			/* istanbul ignore next */
		)
	);
	/* istanbul ignore next */
	for (const file of events_files) {
		const event = await import(`../../events/${file}`);
		const event_name = file.split(".")[0];
		client.on(event_name, event.default.bind(null, client));
	}

	console.log(`Successfully loaded %d events.`, events_files.length);
	console.timeEnd("Time taken");

	return;
};
