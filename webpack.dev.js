const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");

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
    ],
  });
};
