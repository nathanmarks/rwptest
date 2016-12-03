'use strict'; // eslint-disable-line strict

const path = require('path');
const webpack = require('webpack');

// must match config.webpack.dev_server.port
const DEV_SERVER_PORT = 3808;

const ROOT_PATH = path.resolve(__dirname, '../');
const ASSETS_JS_PATH = path.resolve(ROOT_PATH, 'app/assets/javascripts-next');

module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  entry: {
    application: [
      'eventsource-polyfill', // hot reloading in IE... ¯\_(ツ)_/¯
      `webpack-dev-server/client?http://0.0.0.0:${DEV_SERVER_PORT}`,
      'webpack/hot/only-dev-server',
      `${ASSETS_JS_PATH}/application.js`,
    ],
  },
  output: {
    // Build assets directly in to public/webpack/, let webpack know
    // that all webpacked assets start with webpack/

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
        loaders: ['babel'],
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },
  progress: true,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'",
      },
    }),
    {
      apply(compiler) {
        compiler.plugin('emit', (compilation, done) => {
          let result;

          const stats = compilation.getStats().toJson({
            // node_modules/webpack/lib/Stats.js
            hash: true,
            version: true,
            timings: false,
            assets: true,
            chunks: false,
            chunkModules: false,
            chunkOrigins: false,
            modules: false,
            cached: false,
            reasons: false,
            children: false,
            source: false,
            errors: false,
            errorDetails: false,
            warnings: false,
            publicPath: true,
          });
          delete stats.assets;

          compilation.assets['manifest.json'] = {
            size: function getSize() {
              return result ? result.length : 0;
            },
            source: function getSource() {
              result = JSON.stringify(stats);
              return result;
            },
          };

          done();
        });
      },
    },
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
