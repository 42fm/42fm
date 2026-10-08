const SCRIPT_URL = "https://www.youtube.com/s/player/f2999a12/www-widgetapi.vflset/www-widgetapi.js";

export default async function () {
  const response = await fetch(SCRIPT_URL);
  if (!response.ok) {
    throw new Error("Could not download " + SCRIPT_URL);
  }
  const remoteScript = await response.text();
  return { code: "function main() {" + remoteScript + "} main()", cacheable: true };
}
