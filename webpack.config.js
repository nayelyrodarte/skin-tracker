const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './public/scripts.js',
  mode: 'none',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
  },
  devServer: {
    static: './build',
    port: 9090,
    proxy: {
      '*': {
        target: 'http://127.0.0.1:3000',
        secure: false,
        changeOrigin: true,
      },
    },
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
};
