import Devtools from "@/components/Devtools";
import { GlobalStyle } from "@/styles/global";
import { DarkOverrides, theme } from "@/theme";
import { Logger } from "@/utils/log";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { Attachable } from ".";

class DevtoolsModule implements Attachable {
  private container: Element;
  private containerShadow?: ShadowRoot;
  private containerReact?: Root;
  private root: Element;
  private logger: Logger;

  constructor() {
    this.root = document.querySelector("#root")!;
    this.container = document.createElement("div");
    this.container.setAttribute("id", "42fm-devtools-root");
    this.logger = new Logger("DevtoolsModule");
  }

  attach() {
    this.logger.debug("Attach");

    this.root.after(this.container);

    this.containerShadow = this.container.attachShadow({ mode: "closed" });

    this.containerReact = createRoot(this.containerShadow);

    this.containerReact.render(
      <React.StrictMode>
        <StyleSheetManager target={this.containerShadow} disableCSSOMInjection>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <DarkOverrides />
            <Devtools />
          </ThemeProvider>
        </StyleSheetManager>
      </React.StrictMode>,
    );
  }

  detach() {
    this.logger.info("Detach");
    this.containerReact?.unmount();
  }
}

export { DevtoolsModule };
