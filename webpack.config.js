const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config();

module.exports = {
  entry: { 
    app: "./src/index.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./index.html",
        "process.env.GIPHY_API_KEY": JSON.stringify(process.env.GIPHY_API_KEY),
        "process.env.WEATHER_API_KEY": JSON.stringify(process.env.WEATHER_API_KEY)
      })
    ],
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./index.html"]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
    ],
  },
}