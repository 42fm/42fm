const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  return merge(config(env), {
    mode: "production",
    plugins: [
      new Dotenv({
        path: "./.env.production.local",
      }),
    ],
  });
};
