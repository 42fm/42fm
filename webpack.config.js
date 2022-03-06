const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
var { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = (env) => ({
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    content: path.resolve(__dirname, "src/pages/content/content.tsx"),
    background: path.resolve(__dirname, "src/pages/background/background.ts"),
    popup: path.resolve(__dirname, "src/pages/popup/popup.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "dist", env.DIST),
    filename: "[name].js",
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
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  devServer: {
    static: {
      directory: "./dist",
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin({}),
    new CopyPlugin({
      patterns: [
        {
          from: `public/manifest.v${env.MV === "3" ? "3" : "2"}.json`,
          to: "manifest.json",
        },
      ],
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "pages", "popup", "index.html"),
      chunks: ["popup"],
      filename: "popup.html",
    }),
  ],
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
});

module.exports = config;
