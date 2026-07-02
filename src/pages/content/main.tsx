import { waitElement, waitElementID } from "@/utils/observer";
import { DecorationsModule } from "./modules/decorations";
import { HeaderModule } from "./modules/header";
import { PlayerModule } from "./modules/player";
import { SettingsModule } from "./modules/settings";
import { YoutubeModule } from "./modules/youtube";
import { DevtoolsModule } from "./modules/devtools";
import { Logger } from "@/utils/log";

let prevURL: string | null | undefined = navigation.currentEntry?.url;
const channelRegex = /(https:\/\/[a-z]*.twitch.tv\/)(?:(u|popout|moderator)\/)?([a-zA-Z0-9_]{3,25})/;

const navLogger = new Logger("Navigation");

navigation.addEventListener("navigatesuccess", async () => {
  if (!navigation.currentEntry?.url) {
    return;
  }

  let url = navigation.currentEntry.url;

  if (!url.match(channelRegex)) {
    navLogger.info("Not a channel, skipping");
    return;
  }

  if (navigation.currentEntry.url === prevURL) {
    return;
  }

  prevURL = navigation.currentEntry.url;

  navLogger.info("url changed");

  await render();
});

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

function onYouTubeIframeAPIReady() {
  console.log("Youtube Iframe API Ready");
  youtubeModule.attach();
}

let youtubeModule = new YoutubeModule();
let headerModule = new HeaderModule();
let settingsModule = new SettingsModule();
const playerModule = new PlayerModule();
const devtoolsModule = new DevtoolsModule();

export const render = async () => {
  try {
    let chat = await waitElementID("live-page-chat");
    let streamChatContainer = await waitElement(".stream-chat", { target: chat });
    let playerContainer = await waitElement(".stream-chat-header", { target: streamChatContainer });

    playerModule.attach(playerContainer);

    let messagesContainer = await waitElement(".chat-scrollable-area__message-container", { target: streamChatContainer });
    const decorationModule = new DecorationsModule({ element: messagesContainer });

    decorationModule.attach();
    settingsModule.attach();
    devtoolsModule.attach();

    let root = document.getElementById("root")!;
    let headerElement = await waitElement(".top-nav__menu", { target: root });

    headerModule.attach(headerElement);
  } catch (err) {
    console.warn("Failed to render decorations", err);
  }
};
