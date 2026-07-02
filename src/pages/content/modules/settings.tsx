import { DarkOverrides, theme } from "@/theme";
import { Logger } from "@/utils/log";
import { watchParentNode } from "@/utils/observer";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { Attachable } from ".";
import SettingsWrapper from "../components/SettingsWrapper";
import { GlobalStyle } from "@/styles/global";

class SettingsModule implements Attachable {
  private container: Element;
  private containerShadow: ShadowRoot;
  private containerReact?: Root;
  private containerObserver?: MutationObserver;
  private root: Element;
  private logger: Logger;

  constructor() {
    this.root = document.getElementById("root")!;
    this.container = document.createElement("div");
    this.container.setAttribute("id", "42fm-settings-root");
    this.containerShadow = this.container.attachShadow({ mode: "closed" });
    this.logger = new Logger("SettingsModule");

    this.containerReact = createRoot(this.containerShadow);

    this.containerReact!.render(
      <React.StrictMode>
        <StyleSheetManager target={this.containerShadow} disableCSSOMInjection>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <DarkOverrides />
            <SettingsWrapper />
          </ThemeProvider>
        </StyleSheetManager>
      </React.StrictMode>,
    );
  }

  attach() {
    this.logger.info("Attach");

    this.root.after(this.container);

    this.containerObserver = watchParentNode(this.container, () => {
      this.detach();
    });
  }

  detach() {
    this.logger.info("Detach");

    this.containerObserver?.disconnect();
    // this.root.lastChild?.removeChild(this.container);
  }
}

export { SettingsModule };
