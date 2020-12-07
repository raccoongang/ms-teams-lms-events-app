const path = require("path")
const glob = require("glob")

module.exports = {
  entry: {
      "bundle-full.js": glob.sync("dist/*.?(js|css)").map(f => path.resolve(__dirname, f)),
    },
  output: {
    filename: "bundle-full.min.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}
