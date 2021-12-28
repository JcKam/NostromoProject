const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    rocket: './src/rocket/rocket.js',
    aviato: './src/aviato/aviato.js',
    nostromo: './src/nostromo/nostromo.js'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'kit-ui-rocket.html',
      template: path.resolve(__dirname, 'src', 'rocket', 'index.html'),
      chunks: ['rocket']
    }),
    new HtmlWebpackPlugin({
      filename: 'kit-ui-aviato.html',
      template: path.resolve(__dirname, 'src', 'aviato', 'index.html'),
      chunks: ['aviato']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'nostromo', 'index.html'),
      chunks: ['nostromo']
    })
  ].concat(
    devMode
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: 'css/[name].css',
          }),
        ]
  ),
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader','sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
