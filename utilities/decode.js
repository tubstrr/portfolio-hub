// This will allow us to only serve the node-html-parser on the server
// Which helps us reduce our bundle size

import { decode } from "html-entities";

let isServer = false;

if (process.server) {
  isServer = true;
}

export const decoder = isServer ? decode : (html) => {
  const div = document.createElement("div");
  // strip script/html tags
  html = html.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
  html = html.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");

  div.innerHTML = html;

  return div.textContent;
};
