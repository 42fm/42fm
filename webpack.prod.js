import { merge } from "webpack-merge";
import baseConfig from "./webpack.config.js";
import Dotenv from "dotenv-webpack";
import CopyPlugin from "copy-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

/** @returns {webpack.Configuration} */
const config = () => {
  return {
    mode: "production",
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
