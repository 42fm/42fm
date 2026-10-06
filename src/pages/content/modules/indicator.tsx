import { GlobalStyle } from "@/styles/global";
import { DarkOverrides, theme } from "@/theme";
import { Logger } from "@/utils/log";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { AttachableOnce } from ".";
import Indicator from "../components/Indicator";

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

class IndicatorModule implements AttachableOnce {
  private container: Element;
  private containerShadow: ShadowRoot;
  private containerReact?: Root;
  private containerObserver?: MutationObserver;
  private root?: Element;
  private logger: Logger;

  constructor() {
    this.container = document.createElement("div");
    this.container.setAttribute("id", "42fm-indicator-root");

    this.containerShadow = this.container.attachShadow({ mode: "closed" });

    this.containerReact = createRoot(this.containerShadow);

    this.containerReact.render(
      <React.StrictMode>
        <StyleSheetManager target={this.containerShadow} disableCSSOMInjection>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <DarkOverrides />
            <Indicator />
          </ThemeProvider>
        </StyleSheetManager>
      </React.StrictMode>,
    );

    this.logger = new Logger("IndicatorModule");
  }

  attach(element: Element) {
    this.logger.info("Attaching");

    this.root = element;

    this.root.prepend(this.container);

    this.containerObserver = watchParentNode(this.container, () => {
      if (this.container.isConnected) {
        return;
      }

      const streamChatHeaderElement = document.querySelector(".stream-chat-header");

      if (!streamChatHeaderElement) return;

      const rightIconContainerElement = streamChatHeaderElement.querySelector("div:nth-child(2)");

      if (rightIconContainerElement) {
        this.root = rightIconContainerElement;
        this.root?.prepend(this.container);
      }
    });
  }
}

export { IndicatorModule };
