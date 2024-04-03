import { log } from "./utils/log";

log("debug", "Inject File");
log("info", { browser: process.env.BROWSER, clientId: process.env.CLIENT_ID, node_env: process.env.NODE_ENV });

interface Args {
  file_path: string;
  tag?: string;
  id?: string;
  async?: boolean;
}

function injectScript({ file_path, tag = "body", id, async }: Args) {
  let node = document.getElementsByTagName(tag)[0];
  let script = document.createElement("script");
  if (id) script.setAttribute("id", id);
  if (async) script.setAttribute("async", async + "");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file_path);
  node.appendChild(script);
}

function injectStyle(file_path: string, tag: string) {
  let node = document.getElementsByTagName(tag)[0];
  let style = document.createElement("link");
  style.setAttribute("class", "42fm-yt-css");
  style.setAttribute("rel", "stylesheet");
  style.setAttribute("href", file_path);
  node.appendChild(style);
}

injectStyle(chrome.runtime.getURL("assets/style.css"), "head");

injectScript({
  id: "www-widgetapi-script",
  file_path: chrome.runtime.getURL("iframe.js"),
});

injectScript({
  id: "42fm-content",
  file_path: chrome.runtime.getURL("content.js"),
});
