const { join } = require("path");

module.exports = {
  entry: ["@babel/polyfill", join(__dirname, "src", "App.js")],
  output: {
    path: join(__dirname, "dist"),
    filename: "build.js",
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        query: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "stylus-loader",
        ],
      },
    ],
  },
};
