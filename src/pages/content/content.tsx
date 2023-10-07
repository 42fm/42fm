import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import botBadge from "../../assets/botBadge.png";
import contributor from "../../assets/contributor.png";
import devBadge from "../../assets/devBadge.gif";
import HeaderButton from "../../components/HeaderButton";
import { darkMode } from "../../theme";
import { log } from "../../utils/log";
import { getSetting } from "../../utils/settings";
import Player from "./Player";
import YoutubePlayer from "./YoutubePlayer";

log("debug", "Content File");

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

setInterval(async () => {
  const newChannelName = getChannelName();
  if (channelName !== newChannelName) {
    log("debug", `Channel changed: ${channelName} -> ${newChannelName}`);
    channelName = newChannelName;
    player.pauseVideo();
    render();
  }
}, 1000);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkMode}>
      <HeaderButton />
    </ThemeProvider>
  </React.StrictMode>,
  headerElement
);

const badges: {
  [key: string]: {
    icon: string;
    tooltip: string;
  };
} = {
  dev: {
    icon: devBadge,
    tooltip: "42FM Developer",
  },
  contributor: {
    icon: contributor,
    tooltip: "42FM Contributor",
  },
  bot: {
    icon: botBadge,
    tooltip: "42FM Bot",
  },
};

const createBadge = (name: string) => {
  const badgeElement = document.createElement("div");
  badgeElement.style.backgroundImage = `url(${badges[name].icon})`;
  badgeElement.setAttribute("class", "badge-42fm chat-badge");
  badgeElement.setAttribute("data-42fm-badge-tooltip", badges[name].tooltip);
  return badgeElement;
};

const badgeOwners = [
  {
    twitch_id: "36768120",
    twitch_name: "loczuk",
    badge: createBadge("dev"),
    paint: "goldDev",
  },
  {
    twitch_id: "217273053",
    twitch_name: "mat5son",
    badge: createBadge("contributor"),
  },
  {
    twitch_id: "773987717",
    twitch_name: "42fm",
    badge: createBadge("bot"),
    paint: "botPaint",
  },
];

const badge = document.createElement("span");
badge.style.cssText = `
background-image: "";
`;

badge.setAttribute("data-42fm-badge-tooltip", "42FM Developer");
badge.setAttribute("class", "badge-42fm");

let testRoot = document.querySelector("#root");
let testElement = document.createElement("div");
testRoot?.after(testElement);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkMode}>
      <YoutubePlayer />
    </ThemeProvider>
  </React.StrictMode>,
  testElement
);

export let player: YT.Player;

player = new YT.Player("42fm-yt-player", {
  height: "270",
  width: "480",
  videoId: "Yo5QO8K0DrA",
  // videoId: "3yd_eoMOvqk",
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

export async function onPlayerReady(event: YT.PlayerEvent) {
  log("info", "onPlayerReady");

  player.playVideo();
  player.playVideo();
  player.pauseVideo();

  await render();
}

const render = async () => {
  try {
    const chat = await getChat();

    const isMounted = chat.querySelector("#root-42fm");

    if (isMounted) {
      log("debug", "Already mounted");
      return;
    }

    log("info", "Getting YT");

    await getYT();

    log("info", "Got YT");

    const chatHeader = chat.querySelector(".stream-chat-header")!;
    const chatHeaderElement = document.createElement("div");
    chatHeaderElement.setAttribute("id", "root-42fm");
    chatHeader?.after(chatHeaderElement);

    ReactDOM.render(
      <React.StrictMode>
        <ThemeProvider theme={darkMode}>
          <Player room={channelName} player={player} />
        </ThemeProvider>
      </React.StrictMode>,
      chatHeaderElement
    );

    log("debug", `Rendered player for ${channelName}`);

    const messagesContainer = chat.querySelector(".chat-scrollable-area__message-container");

    if (messagesContainer) {
      const observer = new MutationObserver((mutations) => {
        for (const mut of mutations) {
          for (const node of mut.addedNodes) {
            const line = node as Element;
            const badgeOwner = badgeOwners.find(
              (b) =>
                b.twitch_id === line.getAttribute("data-user-id") ||
                b.twitch_name === line.querySelector(".chat-author__display-name")?.getAttribute("data-a-user")
            );
            if (badgeOwner) {
              const badges: HTMLElement = line.querySelector(".chat-line__message--badges")!;
              const badges2: HTMLElement = line.querySelector(".chat-line__username-container")!;
              const author: HTMLElement = line.querySelector(".chat-author__display-name")!;

              if (!getSetting("disablePaints")) {
                if (badgeOwner.paint) {
                  author.classList.add("transparent42fm");
                  author.classList.add(badgeOwner.paint);
                }
              }

              if (!getSetting("disableBadges")) {
                const clone = badgeOwner.badge.cloneNode();
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
