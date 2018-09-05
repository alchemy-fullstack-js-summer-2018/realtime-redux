/* eslint-env node */
const { resolve } = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const buildDir = 'build';
const path = resolve(__dirname, buildDir);

module.exports = {
  // start here
  entry: './src/index.js',
  // put the build output here (not dev server)
  output: {
    path,
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },
  // mode (will eventually be cmd line arg in package.json scripts)
  mode: 'development',
  node: {
    fs: 'empty'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: `./${buildDir}`,
    historyApiFallback: true,
  },
  plugins: [
    // add plugins
    new CleanPlugin(`${path}/bundle.*.js`),
    new HtmlPlugin({ template: './src/index.html' }),
    new Dotenv()
    // new CopyWebpackPlugin([{ from: './src/sprites', to: 'sprites' }])
  ],
  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true }
        }
      },

      // css
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: { 
              sourceMap: true,
              importLoaders: 1 
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          }
        ]
      },

      // images
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 1000 },
        },
      }
    ]
  }
};