const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {join} = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./base');
const fileLoader = require('./file-loader');
const isProduction = require('./util/is-production');

const cwd = process.cwd();

const enableCSSSourceMaps = !isProduction;

module.exports = merge.smart(base, {
  mode: isProduction ? 'production' : 'development',

  devtool: isProduction ? false : 'source-map',

  output: {
    path: join(cwd, 'dist/static'),

    // Append hash of content to file name for longterm hashing if we're building for production.
    filename: `[name]${isProduction ? '.[chunkhash]' : ''}.js`
  },

  optimization: {
    minimize: isProduction,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [{
      test: /\.(s?)css/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: isProduction,
            sourceMap: enableCSSSourceMaps
          }
        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: join(__dirname, 'postcss.config.js')
            },
            sourceMap: enableCSSSourceMaps
          }
        }, {
          // Handle relative urls to assets from within dependencies
          loader: 'resolve-url-loader',
          options: {
            sourceMap: enableCSSSourceMaps
          }
        }, {
          loader: 'sass-loader',
          options: {
            // Allow importing from node_modules without having to specify path to node_modules directory.
            includePaths: [
              join(cwd, 'node_modules')
            ],
            // Source maps must always be enabled for resolve-url-loader
            sourceMap: true
          }
        }]
      })
    },
    {
      test: fileLoader.test,
      use: [{
        loader: 'file-loader',
        options: Object.assign({}, fileLoader.options, {
          emitFile: true
        })
      }, {
        loader: 'image-webpack-loader',
        // Don't compress images unless we are building for production
        options: {
          bypassOnDebug: true
        }
      }]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),

    new ExtractTextPlugin(`[name]${isProduction ? '.[hash]' : ''}.css`, {
      allChunks: true
    }),
  ]
});
