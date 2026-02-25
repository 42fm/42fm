import { execSync } from "child_process";
import webpack from "webpack";
import { resolve } from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { dirname } from "path";
import { fileURLToPath } from "url";
import semver from "semver";

function debugInfo() {
  const GIT_TAG = execSync("git describe --tags --abbrev=0").toString().trim();
  const GIT_TAG_COMMIT = execSync(`git rev-parse --short ${GIT_TAG}`).toString().trim();
  const GIT_COMMIT = execSync("git rev-parse --short HEAD").toString().trim();
  const IS_CLEAN = execSync("git status --porcelain").toString().trim() === "";

  let current_version = semver.parse(GIT_TAG);

  if (GIT_TAG_COMMIT !== GIT_COMMIT) {
    current_version = current_version.inc("patch").toString();
  }

  if (!IS_CLEAN) {
    current_version += "+build";
  }

  return {
    APP_VERSION: "v" + current_version,
    GIT_COMMIT,
  };
}

const info = debugInfo();

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = (env) => {
  return {
    entry: {
      iframe: resolve(__dirname, "src", "iframe.js"),
      content: resolve(__dirname, "src", "pages", "content", "content.tsx"),
      inject: resolve(__dirname, "src", "inject.ts"),
      background: resolve(__dirname, "src", "pages", "background", "background.ts"),
    },
    output: {
      path: resolve(__dirname, "dist", env.DIST),
      filename: "[name].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.ts(x)?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/inline",
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /iframe\.js$/,
          loader: "val-loader",
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.ProgressPlugin({}),
      new webpack.DefinePlugin({
        "process.env.APP_VERSION": JSON.stringify(info.APP_VERSION),
        "process.env.GIT_COMMIT": JSON.stringify(info.GIT_COMMIT),
        "process.env.BROWSER": JSON.stringify(env.BROWSER),
      }),
    ],
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: [".tsx", ".ts", ".js"],
    },
  };
};

export default config;
