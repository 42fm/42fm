import browserOrChrome from "webextension-polyfill";

// @ts-ignore
const isChrome = typeof browser !== "object";

browserOrChrome.runtime.onMessage.addListener((msg: any, sender: browserOrChrome.Runtime.MessageSender) => {
  if (sender.tab?.id && msg.text === "load") {
    if (isChrome) {
      browserOrChrome.scripting.insertCSS({
        target: { tabId: sender.tab.id },
        files: ["assets/style.css"]
      });
    } else {
      browserOrChrome.tabs.insertCSS(sender.tab.id, {
        file: "assets/style.css"
      });
    }
  }
  if (sender.tab?.id && msg.text === "leaderboard") {
    if (isChrome) {
      browserOrChrome.scripting.insertCSS({
        target: { tabId: sender.tab.id },
        css: ".channel-leaderboard{display:none !important}"
      });
    } else {
      browserOrChrome.tabs.insertCSS(sender.tab.id, {
        code: ".channel-leaderboard{display:none !important}"
      });
    }
  }
  console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
});

export {};
