import { merge } from "webpack-merge";
import baseConfig from "./webpack.config.js";
import webpack from "webpack";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @returns {webpack.Configuration} */
const config = () => {
  return {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
      iframe: resolve(__dirname, "src", "iframe.ts"),
    },
  };
};

export default (env) => merge(baseConfig(env), config());
