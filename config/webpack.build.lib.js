const webpack = require("webpack")
const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

const resolve = function(dir) {
  return path.resolve(__dirname, "..", dir)
}

module.exports = {
  entry: {
    index: ["./src/index.js"]
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[id].js",
    path: resolve("lib"),
    library: "karma-ui",
    // libraryTarget: 'commonjs2',
    libraryTarget: "umd",
    umdNamedDefine: true,
    publicPath: ""
  },
  resolve: {
    extensions: [".js", ".jsx", ".vue", ".json"],
    alias: {
      "karma-ui": resolve("src")
    }
  },
  externals: {
    vue: {
      commonjs: "vue/dist/vue.esm.js",
      commonjs2: "vue/dist/vue.esm.js",
      amd: "vue/dist/vue.esm.js",
      root: "vue/dist/vue.esm.js"
    },
    "throttle-debounce": {
      commonjs: "throttle-debounce/index.esm.js",
      commonjs2: "throttle-debounce/index.esm.js",
      amd: "throttle-debounce/index.esm.js",
      root: "throttle-debounce/index.esm.js",
      commonjs: "throttle-debounce/index.cjs.js",
      commonjs2: "throttle-debounce/index.cjs.js",
      amd: "throttle-debounce/index.cjs.js",
      root: "throttle-debounce/index.cjs.js"
    }
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new CleanWebpackPlugin("lib", {
      root: resolve("")
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [resolve("src")],
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        include: [resolve("src")],
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader",
              options: require("./postcssconfig.js")
            }
          ]
        })
      },
      {
        test: /\.vue$/,
        include: [resolve("src")],
        use: [
          {
            loader: "vue-loader"
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 1,
          name: "./fonts/[name].[hash:7].[ext]"
          // name: './fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
}
