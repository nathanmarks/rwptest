'use strict'; // eslint-disable-line strict

const path = require('path');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base.config')

module.exports = createConfig();

function createConfig() {
  const config = webpackBaseConfig.create({
    devtool: 'inline-source-map',
  });

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]);

  Object.keys(config.entry).forEach((n) => {
    let entry = config.entry[n];

    if (typeof entry === 'string') {
      entry = [entry];
    }

    // config.entry[n] = [
    //   `webpack-dev-server/client?http://0.0.0.0:${webpackBaseConfig.DEV_SERVER_PORT}`,
    //   // 'webpack/hot/only-dev-server',
    // ].concat(entry);
  });

  return config;
};
