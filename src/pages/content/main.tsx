import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import HeaderButton from "../../components/HeaderButton";
import { darkMode } from "../../theme";
import { logger } from "../../utils/log";
import { getSetting } from "../../utils/settings";
import Player from "./Player";
import YoutubePlayer from "./YoutubePlayer";
import { badgeOwners } from "./badges";

logger.debug("Content File");

const channelRegex = /(https:\/\/[a-z]*.twitch.tv\/)(?:(u|popout|moderator)\/)?([a-zA-Z0-9_]{3,25})/;
const getChannelName = () => {
  const match = window.location.href.match(channelRegex);
  if (!match) return "";
  return match[3];
};

let channelName = getChannelName();

const getChat = () => {
  return new Promise<HTMLDivElement>((resolve, reject) => {
    const interval = setInterval(() => {
      const chat = document.querySelector<HTMLDivElement>(".stream-chat");
      const isChatVisible = document.querySelector<HTMLDivElement>("#live-page-chat");
      if (isChatVisible && chat) {
        clearInterval(interval);
        resolve(chat);
      }
    }, 500);
  });
};

const getYT = () => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      // @ts-ignore
      if (window.YT !== undefined) {
        clearInterval(interval);
        resolve(true);
      }
    }, 500);
  });
};

navigation.addEventListener("currententrychange", () => {
  if (!navigation.currentEntry?.url) return;

  let match = navigation.currentEntry.url.match(channelRegex);
  if (!match) return;

  let newChannelName = match[3];
  if (channelName !== newChannelName) {
    logger.debug(`Channel changed: ${channelName} -> ${newChannelName}`);
    channelName = newChannelName;
    if (window.YT) {
      logger.info("Got Player");
      player.pauseVideo();
      render();
      renderDecorations()
    }
  }
});

const headerSelector = document.querySelector(".top-nav__menu");
const headerElement = document.createElement("div");
headerSelector?.lastChild?.lastChild?.before(headerElement);
const headerRoot = createRoot(headerElement);
headerRoot.render(
  <React.StrictMode>
    <ThemeProvider theme={darkMode}>
      <HeaderButton />
    </ThemeProvider>
  </React.StrictMode>,
);

let rootSelector = document.querySelector("#root");
let youtubePlayer = document.createElement("div");
rootSelector?.after(youtubePlayer);
const ytRoot = createRoot(youtubePlayer);

ytRoot.render(
  <React.StrictMode>
    <ThemeProvider theme={darkMode}>
      <YoutubePlayer />
    </ThemeProvider>
  </React.StrictMode>,
);

export let player: YT.Player;

export default async function main() {
  await getYT();

  player = new window.YT.Player("42fm-yt-player", {
    height: "270",
    width: "480",
    videoId: "Yo5QO8K0DrA",
    playerVars: {
      playsinline: 1,
      disablekb: 1,
      rel: 0,
      autohide: 1,
      modestbranding: 1,
      showinfo: 0,
      controls: 1,
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}

export async function onPlayerReady(event: YT.PlayerEvent) {
  logger.info("onPlayerReady");

  player.playVideo();
  player.playVideo();
  player.pauseVideo();

  await render();
  await renderDecorations();
}

const render = async () => {
  try {
    const chat = await getChat();

    const isMounted = chat.querySelector("#root-42fm");

    if (isMounted) {
      logger.debug("Already mounted");
      return;
    }

    const chatHeader = chat.querySelector(".stream-chat-header")!;
    const chatHeaderElement = document.createElement("div");
    chatHeaderElement.setAttribute("id", "root-42fm");
    chatHeader?.after(chatHeaderElement);

    const playerRoot = createRoot(chatHeaderElement);

    playerRoot.render(
      <React.StrictMode>
        <ThemeProvider theme={darkMode}>
          <Player room={channelName} player={player} />
        </ThemeProvider>
      </React.StrictMode>,
    );

    logger.debug(`Rendered player for ${channelName}`);
  } catch (e) {
    logger.error(e);
  }
};

const renderDecorations = async () => {
  try {
    const chat = await getChat();

    const messagesContainer = chat.querySelector(".chat-scrollable-area__message-container");

    if (messagesContainer) {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            const line = node as Element;

            const badgeOwner = badgeOwners.find(
              (b) =>
                b.twitch_id === line.getAttribute("data-user-id") ||
                b.twitch_name === line.querySelector(".chat-author__display-name")?.getAttribute("data-a-user") ||
                b.twitch_id === line.querySelector(".chat-line__message")?.getAttribute("data-user-id") || // ffz
                b.twitch_name === line.querySelector(".chat-line__message")?.getAttribute("data-a-user"), // ffz
            );
            if (!badgeOwner) {
              continue;
            }

            const badgesFFZ: HTMLDivElement | null = line.querySelector(".chat-line__message--badges");
            const badgesTwitch: HTMLDivElement | null = line.querySelector(".chat-line__username-container");
            const author: HTMLSpanElement | null = line.querySelector(".chat-author__display-name");

            if (!getSetting("disablePaints")) {
              if (badgeOwner.paint && author) {
                author.classList.add("transparent42fm");
                author.classList.add(badgeOwner.paint);
              }
            }

            if (!getSetting("disableBadges")) {
              const clone = badgeOwner.badge.cloneNode();
              if (badgesFFZ !== null) {
                badgesFFZ.appendChild(clone);
              } else if (badgesTwitch) {
                badgesTwitch.firstChild?.appendChild(clone);
              }
            }
          }
        }
      });

      observer.observe(messagesContainer, { childList: true });
      logger.debug(`Started observer for ${channelName}`);
    }

    setTimeout(() => {
      const sevenTvMessageContainer = chat.querySelector("#seventv-message-container");

      if (!sevenTvMessageContainer) return;

      const sevenTvMessages = sevenTvMessageContainer?.querySelector(".seventv-chat-list");

      if (!sevenTvMessages) return;

      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            const line = node as Element;

            const username = line.querySelector(".seventv-chat-user-username > span > span")?.textContent;
            if (!username) continue;

            const badgeOwner = badgeOwners.find((b) => b.twitch_name === username?.toLowerCase());
            if (!badgeOwner) continue;

            const chatUser = line.querySelector(".seventv-chat-user");
            if (!chatUser) continue;

            let badges = chatUser.querySelector(".seventv-chat-user-badge-list");
            if (!badges) {
              badges = document.createElement("span");
              badges.classList.add("seventv-chat-user-badge-list");
              chatUser.prepend(badges);
            }

            if (!getSetting("disableBadges")) {
              const clone = badgeOwner.badge.cloneNode() as Element;
              if (badges !== null) {
                badges.appendChild(clone);
              }
            }
          }
        }
      });

      observer.observe(sevenTvMessages, { childList: true });
    }, 5000);
  } catch (e) {
    logger.error(e);
  }
};