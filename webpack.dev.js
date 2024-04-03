const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
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
        path: "./.env",
      }),
      new CopyPlugin({
        patterns: [
          { from: "src/assets", to: "assets" },
          {
            transform(content) {
              const data = JSON.parse(content.toString());
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
