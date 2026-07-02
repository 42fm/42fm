import { GlobalStyle } from "@/styles/global";
import { DarkOverrides, theme } from "@/theme";
import { Logger } from "@/utils/log";
import { watchParentNode } from "@/utils/observer";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { AttachableElement } from ".";
import PlayerWrapper from "../components/PlayerWrapper";
import { useYoutubePlayerStore } from "../stores/youtube";

class PlayerModule implements AttachableElement {
  private container: Element;
  private containerShadow: ShadowRoot;
  private containerReact?: Root;
  private containerObserver?: MutationObserver;
  private root?: Element;
  private logger: Logger;

  constructor() {
    this.container = document.createElement("div");
    this.container.setAttribute("id", "42fm-player-root");

    this.containerShadow = this.container.attachShadow({ mode: "closed" });

    this.containerReact = createRoot(this.containerShadow);

    this.containerReact!.render(
      <React.StrictMode>
        <StyleSheetManager target={this.containerShadow} disableCSSOMInjection>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <DarkOverrides />
            <PlayerWrapper />
          </ThemeProvider>
        </StyleSheetManager>
      </React.StrictMode>,
    );

    this.logger = new Logger("PlayerModule");
  }

  attach(element: Element) {
    this.logger.info("Attaching");

    this.root = element;

    this.containerObserver = watchParentNode(this.container, () => {
      this.detach();
    });

    this.root.after(this.container);
  }

  detach() {
    this.logger.info("Detaching");
    this.containerObserver?.disconnect();
    let { player } = useYoutubePlayerStore.getState();

    if (player?.getPlayerState() === YT.PlayerState.PLAYING) {
      player?.pauseVideo();
    }
  }
}

export { PlayerModule };
