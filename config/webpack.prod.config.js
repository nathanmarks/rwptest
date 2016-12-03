'use strict'; // eslint-disable-line strict

const path = require('path');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base.config')

module.exports = createConfig();

function createConfig() {
  const config = webpackBaseConfig.create({
    devtool: 'hidden-source-map',
  });

  config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    }),
  ]);

  return config;
};
