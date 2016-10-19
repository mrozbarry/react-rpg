var path = require("path")
var webpack = require("webpack")

var root = path.resolve(__dirname, "..")

module.exports = {
  devtool: "cheap-eval-source-map",
  entry: {
    game: [
      "webpack/hot/only-dev-server",
      path.resolve(root, "src", "game.js")
    ]
  },
  output: {
    path: path.resolve(root, "public"),
    filename: "[name].js",
    publicPath: "/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel"],
        include: path.resolve(root, "src")
      },
      {
        test: /\.sass$/,
        loaders: ["style", "css", "sass?indentedSyntax=true"],
        include: path.resolve(root, "src")
      },
      {
        test: /\.png$/,
        loaders: ["file"],
        include: path.resolve(root, "src")
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    root: [
      path.resolve(root, "src")
    ]
  },
  devServer: {
    contentBase: path.resolve(root, "public"),
    hot: true,
    inline: true,
    progress: true,
    publicPath: "/"
  }
}
