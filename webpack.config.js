import webpack from "webpack";
import { resolve } from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { dirname } from "path";
import { fileURLToPath } from "url";

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
