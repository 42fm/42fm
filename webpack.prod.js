import { merge } from "webpack-merge";
import config from "./webpack.config.js";
import Dotenv from "dotenv-webpack";
import CopyPlugin from "copy-webpack-plugin";

export default (env) => {
  return merge(config(env), {
    mode: "production",
    plugins: [
      new Dotenv({
        path: "./.env.production",
      }),
      new CopyPlugin({
        patterns: [
          { from: "src/assets", to: "assets" },
          {
            from: `public/manifest.${env.BROWSER}.json`,
            to: "manifest.json",
          },
        ],
      }),
    ],
  });
};
