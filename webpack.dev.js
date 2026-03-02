import Dotenv from "dotenv-webpack";
import { merge } from "webpack-merge";
import config from "./webpack.config.js";
import CopyPlugin from "copy-webpack-plugin";

export default (env) => {
  return merge(config(env), {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      static: {
        directory: "./dist",
      },
    },
    plugins: [
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
  });
};
