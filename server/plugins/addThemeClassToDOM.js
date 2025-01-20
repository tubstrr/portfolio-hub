import { whichTheme } from "@/composables/useTheme";

export default defineNitroPlugin((nitroApp) => {
	nitroApp.hooks.hook("render:response", (response, { event }) => {
		const cookies = parseCookies(event);

		const theme = whichTheme(cookies.theme || "light");

		const domRegex = /<html/g;
		const domMatches = response.body.match(domRegex);
		if (domMatches && domMatches.length) {
			response.body = response.body.replace(domRegex, `<html class="${theme}"`);
		}
	});
});
