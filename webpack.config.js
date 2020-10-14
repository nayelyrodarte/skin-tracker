const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './public/scripts.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.html',
    }),
    new miniCSSExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          { loader: miniCSSExtractPlugin.loader },
        ],
      },
    ],
  },
};
