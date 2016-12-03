'use strict';

const path = require('path');
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

function create(config) {
  return merge({
    entry: {
      application: `${ASSETS_JS_PATH}/application.js`,
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
    ],
  }, config);
}
