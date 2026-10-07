import { waitElement, waitElementID } from "@/utils/observer";
import { DecorationsModule } from "./modules/decorations";
import { HeaderModule } from "./modules/header";
import { PlayerModule } from "./modules/player";
import { SettingsModule } from "./modules/settings";
import { YoutubeModule } from "./modules/youtube";
import { DevtoolsModule } from "./modules/devtools";
import { IndicatorModule } from "./modules/indicator";

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

function onYouTubeIframeAPIReady() {
  console.log("Youtube Iframe API Ready");
  youtubeModule.attach();
}

const youtubeModule = new YoutubeModule();
const headerModule = new HeaderModule();
const settingsModule = new SettingsModule();
const playerModule = new PlayerModule();
const indicatorModule = new IndicatorModule();

export const render = async () => {
  try {
    const chat = await waitElementID("live-page-chat");
    const streamChatContainer = await waitElement(".stream-chat", { target: chat });
    const playerContainer = await waitElement(".stream-chat-header", { target: streamChatContainer });

    playerModule.attach(playerContainer);

    const indicatorContainer = await waitElement("div:nth-child(2)", { target: playerContainer });

    indicatorModule.attach(indicatorContainer);

    const messagesContainer = await waitElement(".chat-scrollable-area__message-container", { target: streamChatContainer });
    const decorationModule = new DecorationsModule({ element: messagesContainer });

    decorationModule.attach();
    settingsModule.attach();

    const root = document.getElementById("root")!;
    const headerElement = await waitElement(".top-nav__menu", { target: root });

    headerModule.attach(headerElement);

    if (process.env.NODE_ENV === "development") {
      const devtoolsModule = new DevtoolsModule();
      devtoolsModule.attach();
    }
  } catch (err) {
    console.warn("Failed to render decorations", err);
  }
};
