const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');
const SvgStore = require('webpack-svgstore-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: [
    require.resolve('./polyfill'),
    path.resolve(__dirname, '../src/index.js'),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
    },
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['build', 'dist'], {
      root: path.resolve(__dirname, '../'),
    }),
    new CaseSensitivePathsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
      filename: path.resolve(__dirname, '../build/index.html'),
    }),
    new SvgStore({
      prefix: '',
      svgoOptions: {
        plugins: [
          {
            removeTitle: true,
          },
          {
            removeStyleElement: true,
          },
        ],
      },
    }),
  ],
  optimization: {
    namedModules: true,
    splitChunks: {
      name: 'vendor',
      minChunks: 2,
    },
    noEmitOnErrors: true,
    concatenateModules: true,
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../build'),
    historyApiFallback: true,
    compress: true,
    port: 9000,
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    open: true,
  },
};
