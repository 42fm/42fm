import Dotenv from "dotenv-webpack";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.config.js";
import CopyPlugin from "copy-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import webpack from "webpack";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import CrxLoadScriptWebpackPlugin from "@cooby/crx-load-script-webpack-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @returns {webpack.Configuration} */
const config = (env) => {
  return {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
      content: resolve(__dirname, "src", "pages", "content", "content.tsx"),
      background: resolve(__dirname, "src", "pages", "background", "background.ts"),
    },
    devServer: {
      static: {
        watch: false,
      },
      client: {
        webSocketURL: "ws://localhost:8080/ws",
      },
      devMiddleware: {
        writeToDisk: true, // writes all output files to disk
      },
      allowedHosts: "all",
      hot: false,
      liveReload: false,
      compress: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin({ overlay: false }),
      new CrxLoadScriptWebpackPlugin(),
      new Dotenv({
        path: "./.env.development",
      }),
      new CopyPlugin({
        patterns: [
          { from: "src/assets", to: "assets" },
          {
            transform(content) {
              const data = JSON.parse(content.toString());
              data.name = "42FM - Dev";
              data.action.default_icon["32"] = "assets/logo-32-dev.png";
              data.icons["32"] = "assets/logo-32-dev.png";
              data.icons["64"] = "assets/logo-64-dev.png";
              data.icons["128"] = "assets/logo-128-dev.png";
              return JSON.stringify(data, null, 2);
            },
            from: `public/manifest.${env.BROWSER}.json`,
            to: "manifest.json",
          },
        ],
      }),
    ],
  };
};

export default (env) => merge(baseConfig(env), config(env));
