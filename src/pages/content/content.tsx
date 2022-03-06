import React from "react";
import ReactDOM from "react-dom";
import Player from "./Player";
import { ThemeProvider, DefaultTheme } from "styled-components";
import { getSetting } from "../../utils/settings";
import { log } from "../../utils/log";
import { theme } from "../../theme";
import HeaderButton from "../../components/HeaderButton";
import icons from "../../icons";
import browser from "webextension-polyfill";

try {
  browser.runtime.sendMessage({ text: "load" });
  getSetting("hideLeaderboard") && browser.runtime.sendMessage({ text: "leaderboard" });
} catch (e) {
  log("error", e);
}

const channelRegex = /(https:\/\/[a-z]*.twitch.tv\/)(?:(u|popout|moderator)\/)?([a-zA-Z0-9_]{3,25})/;
const getChannelName = () => {
  const match = window.location.href.match(channelRegex);
  if (!match) return "";
  return match[3];
};

let channelName = getChannelName();

const header = document.querySelector(".top-nav__menu");
const headerElement = document.createElement("div");
header?.lastChild?.lastChild?.before(headerElement);

const getChat = () => {
  return new Promise<HTMLDivElement>((resolve, reject) => {
    const interval = setInterval(() => {
      const chat = document.querySelector<HTMLDivElement>(".stream-chat");
      if (chat) {
        clearInterval(interval);
        resolve(chat);
      }
    }, 500);
  });
};

setInterval(async () => {
  const newChannelName = getChannelName();
  if (channelName !== newChannelName) {
    log("debug", `Channel changed: ${channelName} -> ${newChannelName}`);
    channelName = newChannelName;
    render();
  }
}, 5000);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HeaderButton />
    </ThemeProvider>
  </React.StrictMode>,
  headerElement
);

const badge = document.createElement("span");
badge.style.cssText = `
background-image: url(${icons.devBadge});
`;

badge.setAttribute("data-42fm-badge-tooltip", "42FM Developer");
badge.setAttribute("class", "badge-42fm");

const render = async () => {
  try {
    const chat = await getChat();

    const isMounted = chat.querySelector("#root-42fm");

    if (isMounted) {
      log("debug", "Already mounted");
      return;
    }

    const chatHeader = chat.querySelector(".stream-chat-header")!;
    const chatHeaderElement = document.createElement("div");
    chatHeaderElement.setAttribute("id", "root-42fm");
    chatHeader?.after(chatHeaderElement);

    ReactDOM.render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Player room={channelName} />
        </ThemeProvider>
      </React.StrictMode>,
      chatHeaderElement
    );

    log("debug", `Rendered player for ${channelName}`);

    const messagesContainer = chat.querySelector(".chat-scrollable-area__message-container");

    if (messagesContainer) {
      const observer = new MutationObserver(mutations => {
        for (const mut of mutations) {
          for (const node of mut.addedNodes) {
            const line = node as Element;
            console.log(line);
            if (
              line.getAttribute("data-user-id") === "36768120" ||
              line.querySelector(".chat-author__display-name")?.getAttribute("data-a-user") === "loczuk"
            ) {
              const badges: HTMLElement = line.querySelector(".chat-line__message--badges")!;
              const badges2: HTMLElement = line.querySelector(".chat-line__username-container")!;
              const author: HTMLElement = line.querySelector(".chat-author__display-name")!;

              if (!getSetting("disableBadges")) {
                author.classList.add("goldDev");
              }

              if (!getSetting("disablePaints")) {
                const clone = badge.cloneNode();
                if (badges !== null) {
                  badges.appendChild(clone);
                } else if (badges2) {
                  badges2.firstChild?.appendChild(clone);
                }
              }
            }
          }
        }
      });

      observer.observe(messagesContainer, { childList: true });
      log("debug", `Started observer for ${channelName}`);
    }
  } catch (e) {
    log("error", e);
  }
};

render();
