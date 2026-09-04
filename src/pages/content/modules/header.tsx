import HeaderButton from "@/components/HeaderButton";
import { DarkOverrides, theme } from "@/theme";
import { Logger } from "@/utils/log";
import { watchParentNode } from "@/utils/observer";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { AttachableOnce } from ".";
import { GlobalStyle } from "@/styles/global";

class HeaderModule implements AttachableOnce {
  private container: Element;
  private containerShadow?: ShadowRoot;
  private containerReact?: Root;
  private containerObserver?: MutationObserver;
  private root?: Element;
  private logger: Logger;

  constructor() {
    this.container = document.createElement("div");
    this.container.setAttribute("id", "42fm-header-root");
    this.containerShadow = this.container.attachShadow({ mode: "closed" });
    this.containerReact = createRoot(this.containerShadow);
    this.logger = new Logger("HeaderModule");

    this.containerReact.render(
      <React.StrictMode>
        <StyleSheetManager target={this.containerShadow} disableCSSOMInjection>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <DarkOverrides />
            <HeaderButton />
          </ThemeProvider>
        </StyleSheetManager>
      </React.StrictMode>,
    );
  }

  attach(element: Element) {
    this.logger.debug("Attaching module");

    this.root = element;

    this.root?.lastChild?.lastChild?.before(this.container);

    this.containerObserver = watchParentNode(this.container, () => {
      this.logger.info("Detaching");
      this.containerObserver?.disconnect();
    });
  }
}

export { HeaderModule };
