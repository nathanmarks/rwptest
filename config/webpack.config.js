'use strict'; // eslint-disable-line strict

const path = require('path');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');

// must match config.webpack.dev_server.port
const DEV_SERVER_PORT = 3808;

const ROOT_PATH = path.resolve(__dirname, '../');
const ASSETS_JS_PATH = path.resolve(ROOT_PATH, 'app/assets/javascripts');

function createWebpackConfig(config) {
  return Object.assign({
    devtool: 'inline-source-map',
    entry: {
      application: [
        `${ASSETS_JS_PATH}/application.js`,
      ],
    },
    output: {
      // must match config.webpack.output_dir
      path: path.resolve(ROOT_PATH, 'public/assets'),
      publicPath: `http://0.0.0.0:${DEV_SERVER_PORT}/assets/`,
      filename: '[name].js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: "'development'",
        },
      }),
      new StatsPlugin('manifest.json'),
      new webpack.NamedModulesPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
    ],
  }, config);
}
