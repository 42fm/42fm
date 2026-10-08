import { render } from "./main";

if (import.meta.webpackHot && process.env.NODE_ENV === "development") {
  /**
   * This will change `publicPath` to `chrome-extension://<extension_id>/`.
   * It for runtime to get script chunks from the output folder
   * and for asset modules like file-loader to work.
   */
  __webpack_public_path__ = chrome.runtime.getURL("");

  import.meta.webpackHot.accept();

  // @ts-expect-error no type definition found
  await import("webpack/hot/dev-server");
  /**
   * Set WebSocket url to dev-server, instead of the default `${publicPath}/ws`
   */
  // @ts-expect-error no type definition found
  await import("webpack-dev-server/client/index?hot=true&protocol=ws&hostname=localhost&port=8080");
}

await render();
