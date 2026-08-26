const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "web",
  mode: "development",
  entry: path.resolve(__dirname, "src", "main.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    port: 3000,
    open: true,
    hot: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: path.resolve(__dirname, "public", "assets", "scissors.svg"),
      inject: "body",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public", "assets"),
          to: path.resolve(__dirname, "dist", "assets"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
