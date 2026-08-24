import { waitElement, waitElementID } from "@/utils/observer";
import { DecorationsModule } from "./modules/decorations";
import { HeaderModule } from "./modules/header";
import { PlayerModule } from "./modules/player";
import { SettingsModule } from "./modules/settings";
import { YoutubeModule } from "./modules/youtube";
import { DevtoolsModule } from "./modules/devtools";

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

function onYouTubeIframeAPIReady() {
  console.log("Youtube Iframe API Ready");
  youtubeModule.attach();
}

const youtubeModule = new YoutubeModule();
const headerModule = new HeaderModule();
const settingsModule = new SettingsModule();
const playerModule = new PlayerModule();
const devtoolsModule = new DevtoolsModule();

export const render = async () => {
  try {
    const chat = await waitElementID("live-page-chat");
    const streamChatContainer = await waitElement(".stream-chat", { target: chat });
    const playerContainer = await waitElement(".stream-chat-header", { target: streamChatContainer });

    playerModule.attach(playerContainer);

    const messagesContainer = await waitElement(".chat-scrollable-area__message-container", { target: streamChatContainer });
    const decorationModule = new DecorationsModule({ element: messagesContainer });

    decorationModule.attach();
    settingsModule.attach();
    devtoolsModule.attach();

    const root = document.getElementById("root")!;
    const headerElement = await waitElement(".top-nav__menu", { target: root });

    headerModule.attach(headerElement);
  } catch (err) {
    console.warn("Failed to render decorations", err);
  }
};
