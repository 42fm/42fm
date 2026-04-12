import CopyPlugin from "copy-webpack-plugin";
import Dotenv from "dotenv-webpack";
import { dirname, resolve } from "path";
import TerserPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @returns {webpack.Configuration} */
const config = () => {
  return {
    mode: "production",
    entry: {
      content: resolve(__dirname, "src", "pages", "content", "content.tsx"),
      background: resolve(__dirname, "src", "pages", "background", "background.ts"),
      iframe: resolve(__dirname, "src", "iframe.ts"),
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.swcMinify,
        }),
      ],
    },
    output: {
      clean: true,
    },
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
  };
};

export default (env) => merge(baseConfig(env), config(env));
