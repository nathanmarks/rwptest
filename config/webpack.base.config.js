'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('lodash/merge');

const DEV_SERVER_PORT = 3808;
const ROOT_PATH = path.resolve(__dirname, '../');
const ASSETS_JS_PATH = path.resolve(ROOT_PATH, 'app/assets/javascripts');

module.exports = {
  DEV_SERVER_PORT,
  ROOT_PATH,
  ASSETS_JS_PATH,
  create,
};

function assetManifests() {
  const manifestsPath = path.resolve(ASSETS_JS_PATH, 'manifests');
  const manifests = fs.readdirSync(manifestsPath);

  return manifests.reduce((result, filename) => {
    result[filename.replace('.js', '')] = `${manifestsPath}/${filename}`;
    return result;
  }, {});
}

function create(config) {
  return merge({
    entry: merge({
      application: `${ASSETS_JS_PATH}/application.js`,
    }, assetManifests()),
    output: {
      // must match config.webpack.output_dir
      path: path.resolve(ROOT_PATH, 'public/assets'),
      publicPath: `/assets/`,
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
    resolve: {
      alias: {
        modules: path.resolve(ASSETS_JS_PATH, 'modules'),
      },
    },
    plugins: [
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'application',
      //   minChunks: 2,
      // }),
      webpackRailsManifestPlugin,
    ],
  }, config);
}

const webpackRailsManifestPlugin = {
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
};
