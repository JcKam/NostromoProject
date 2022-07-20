const glob = require('glob');
const path = require('path/posix');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    rocket: './src/rocket/rocket.js',
    aviato: './src/aviato/aviato.js',
    nostromo: './src/nostromo/nostromo.js',
  },
  output: {
    filename: '[name]/[name].[hash].js',
    path: path.join(__dirname, 'dist'),
    assetModuleFilename: 'static/[hash][ext][query]',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'rocket/index.html',
      template: path.join(__dirname, 'src', 'rocket', 'index.html'),
      chunks: ['rocket'],
    }),
    new HtmlWebpackPlugin({
      filename: 'aviato/index.html',
      template: path.join(__dirname, 'src', 'aviato', 'index.html'),
      chunks: ['aviato'],
    }),
    new HtmlWebpackPlugin({
      filename: 'nostromo/index.html',
      template: path.join(__dirname, 'src', 'nostromo', 'index.html'),
      chunks: ['nostromo'],
    }),
  ]
    .concat(
      glob.sync('src/**/!(index).html').map((file) => {
        const pathSplit = file.split(path.sep);
        pathSplit.shift(); // remove src/
        const chunkName = pathSplit[0];
        const filename = pathSplit.join(path.sep);
        return new HtmlWebpackPlugin({
          filename,
          template: path.join(__dirname, 'src', filename),
          chunks: [chunkName],
        });
      })
    )
    .concat(
      devMode
        ? [new BundleAnalyzerPlugin()]
        : [
            new MiniCssExtractPlugin({
              filename: '[name]/[name].css',
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
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[name].[hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name].[hash][ext][query]',
        },
      },
    ],
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    open: ['/nostromo/index.html'],
  },
};
