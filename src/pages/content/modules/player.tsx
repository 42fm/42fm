import { GlobalStyle } from "@/styles/global";
import { DarkOverrides, theme } from "@/theme";
import { Logger } from "@/utils/log";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { AttachableOnce } from ".";
import PlayerWrapper from "../components/PlayerWrapper";

function createCallback(element: Element, callback: (element: Element) => void) {
  const detachCallback = (mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        callback(element);
      }
    }
  };
  return detachCallback;
}

function watchParentNode(element: Element, callback: (element: Element) => void) {
  const observer = new MutationObserver(createCallback(element, callback));

  observer.observe(document.body.querySelector("#root")!, { childList: true, subtree: true });

  return observer;
}

class PlayerModule implements AttachableOnce {
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

    this.containerReact.render(
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

    this.root.after(this.container);

    this.containerObserver = watchParentNode(this.container, () => {
      if (this.container.isConnected) {
        return;
      }

      const streamChatHeaderElement = document.querySelector(".stream-chat-header");

      if (streamChatHeaderElement) {
        this.root = streamChatHeaderElement;
        this.root?.after(this.container);
      }
    });
  }
}

export { PlayerModule };
