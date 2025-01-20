export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:response", (response, { event }) => {
    // if (!process.env.NODE_ENV === "production") return;
    // const stylesheetsRegex = /<link rel="stylesheet" href=".*">/g;
    // const stylesheetsMatches = response.body.match(stylesheetsRegex);
    // if (stylesheetsMatches && stylesheetsMatches.length) {
    //   response.body = response.body.replace(stylesheetsRegex, "");
    // }
  });
});
