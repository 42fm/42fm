import browser from "webextension-polyfill";

// @ts-ignore
const isChrome = typeof browser !== "object";

browser.runtime.onMessage.addListener((msg: any, sender: browser.Runtime.MessageSender) => {
  if (sender.tab?.id && msg.text === "load") {
    if (isChrome) {
      browser.scripting.insertCSS({
        target: { tabId: sender.tab.id },
        files: ["assets/style.css"],
      });
    } else {
      browser.tabs.insertCSS(sender.tab.id, {
        file: "assets/style.css",
      });
    }
  }
  if (sender.tab?.id && msg.text === "leaderboard") {
    if (isChrome) {
      browser.scripting.insertCSS({
        target: { tabId: sender.tab.id },
        css: ".channel-leaderboard{display:none !important}",
      });
    } else {
      browser.tabs.insertCSS(sender.tab.id, {
        code: ".channel-leaderboard{display:none !important}",
      });
    }
  }
  console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
});

chrome.runtime.onMessageExternal.addListener(function (request, sender, senderResponse) {
  if (request.origin !== "https://www.twitch.tv") {
    if (request.type === "version") {
      senderResponse(chrome.runtime.getManifest().version);
    }
  }
});

export {};
