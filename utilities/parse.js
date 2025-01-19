// This will allow us to only serve the node-html-parser on the server
// Which helps us reduce our bundle size

import { parse } from "node-html-parser";

let isServer = false;

if (process.server) {
  isServer = true;
}

export const parser = isServer ? parse : (html) => {
  const t = document.createElement("template");
  t.innerHTML = html;
  return t.content;
};
