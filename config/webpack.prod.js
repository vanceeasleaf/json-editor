const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const RemoveStrictPlugin = require("remove-strict-webpack-plugin");
const commonConfig = require("./webpack.common.js");
const helpers = require("./helpers");

module.exports = () => {
  commonConfig.module.rules = [
    // {
    //   enforce: 'pre',
    //   test: /\.js$/,
    //   exclude: /node_modules/,
    //   loader: 'eslint-loader'
    // },
    {
      test: /\.js|\.css.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
          // options: {
          //   presets: ["@babel/preset-env"],
          // },
        },
      ],
    },
    {
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
            plugins: [
              require("cssnano")({
                preset: "default",
              }),
            ],
          },
        },
      ],
    },
  ];

  return webpackMerge(commonConfig, {
    mode: "production",
    output: {
      path: helpers.root("dist"),
      publicPath: "/dist/",
      filename: "[name].js",
      libraryTarget: "umd",
    },

    optimization: {
      minimize: true,
    },

    plugins: [
      new RemoveStrictPlugin(), // I have put this in to avoid IE throwing error Assignment to read-only properties is not allowed in strict mode
      // This doesn't seem to actually be minimising the CSS!
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  });
};
