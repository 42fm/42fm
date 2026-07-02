import { darkMode, DarkOverrides, theme } from "@/theme";
import { Logger } from "@/utils/log";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { Attachable } from ".";
import YoutubePlayer from "../components/YoutubePlayer";
import { useYoutubePlayerStore } from "../stores/youtube";
import { GlobalStyle } from "@/styles/global";

class YoutubeModule implements Attachable {
  private container: Element;
  private containerShadow?: ShadowRoot;
  private containerReact?: Root;
  private player?: YT.Player;
  private root: Element;
  private logger: Logger;

  constructor() {
    this.root = document.querySelector("#root")!;
    this.container = document.createElement("div");
    this.containerShadow = this.container.attachShadow({ mode: "open" });
    this.container.setAttribute("id", "42fm-yt-player-root");
    this.logger = new Logger("YoutubeModule");

    this.containerReact = createRoot(this.containerShadow);

    this.containerReact!.render(
      <React.StrictMode>
        <StyleSheetManager target={this.containerShadow} disableCSSOMInjection>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <DarkOverrides />
            <YoutubePlayer />
          </ThemeProvider>
        </StyleSheetManager>
      </React.StrictMode>,
    );
  }

  attach() {
    this.logger.debug("Loading Youtube API");

    this.root.after(this.container);

    const onPlayerReady = () => {
      this.logger.debug("Player loaded");

      useYoutubePlayerStore.setState({ player: this.player! });
    };

    // TODO: the id is not yet rendered when this code runs and for now we use a settimeout
    setTimeout(() => {
      this.logger.info("Attaching Youtube player to DOM");
      this.player = new window.YT.Player(this.containerShadow!.getElementById("42fm-yt-player")!, {
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
          onAutoplayBlocked: () => {
            console.log("autoplay blocked");
          },
          onError: (x) => {
            console.error(x);
          },
        },
      });
    }, 1000);
  }

  detach() {
    this.logger.info("Detach");
    this.containerReact?.unmount();
  }
}

export { YoutubeModule };
