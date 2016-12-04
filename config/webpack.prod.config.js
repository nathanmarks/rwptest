'use strict'; // eslint-disable-line strict

const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpackBaseConfig = require('./webpack.base.config')

module.exports = createConfig();

function createConfig() {
  const config = webpackBaseConfig.create({
    devtool: 'hidden-source-map',
    output: {
      filename: '[name]-[chunkhash].js',
    },
  });

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      sourceMap: true,
    }),
    new WebpackMd5Hash(),
  ]);

  return config;
};
