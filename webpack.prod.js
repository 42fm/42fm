const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
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
