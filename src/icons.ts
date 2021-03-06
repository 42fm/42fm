// var isFirefox = true;
// if (typeof browser === "undefined") {
//   isFirefox = false;
// }
import getAsset from "./utils/getAsset";
import browser from "webextension-polyfill";

const icons = {
  play: browser.runtime.getURL("/assets/play.svg"),
  pause: browser.runtime.getURL("/assets/pause.svg"),
  add: browser.runtime.getURL("/assets/add.svg"),
  reload: browser.runtime.getURL("/assets/reload.svg"),
  list: browser.runtime.getURL("/assets/list.svg"),
  settings: browser.runtime.getURL("/assets/settings.svg"),
  cross: browser.runtime.getURL("/assets/cross.svg"),
  skip: browser.runtime.getURL("/assets/skip.svg"),
  volume: browser.runtime.getURL("/assets/volume.svg"),
  volumeMuted: browser.runtime.getURL("/assets/volume-muted.svg"),
  volumeMedium: browser.runtime.getURL("/assets/volume-medium.svg"),
  compact: browser.runtime.getURL("/assets/compact.svg"),
  expand: browser.runtime.getURL("/assets/expand.svg"),
  logo: browser.runtime.getURL("/assets/logo.svg"),
  ban: browser.runtime.getURL("/assets/ban.svg"),
  checkmark: browser.runtime.getURL("/assets/checkmark.svg"),
  history: browser.runtime.getURL("/assets/history.svg"),
  github: browser.runtime.getURL("/assets/github.svg"),
  paypal: browser.runtime.getURL("/assets/paypal.svg"),
  twitter: browser.runtime.getURL("/assets/twitter.svg"),
  glitch: browser.runtime.getURL("/assets/glitch.svg"),
  carrot: browser.runtime.getURL("/assets/carrot.svg"),
  connect: browser.runtime.getURL("/assets/connect.svg"),
  disconnect: browser.runtime.getURL("/assets/disconnect.svg"),
  warning: browser.runtime.getURL("/assets/warning.svg"),
  contributor: browser.runtime.getURL("/assets/contributor.png"),
  botBadge: browser.runtime.getURL("/assets/botBadge.png"),
  devBadge: browser.runtime.getURL("/assets/devBadge.gif"),
  pepeds: browser.runtime.getURL("/assets/pepeds.gif"),
  modcheck: browser.runtime.getURL("/assets/modcheck.gif"),
};

export default icons;
