const SourceMapSupportPlugin = require('webpack-source-map-support');
const {join} = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const baseConfig = require('./base');
const fileLoader = require('./file-loader');

const cwd = process.cwd();

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  target: 'node',

  // Don't bundle dependencies
  externals: [
    nodeExternals({
      whitelist: [
        // Ensure all non-JavaScript modules are transpiled.
        // Snatched from https://www.npmjs.com/package/webpack-node-externals#how-can-i-bundle-required-assets-ie-css-files-from-node_modules
        /\.(?!(?:jsx?|json)$).{1,5}$/,

        // Ensure modules in the @underdogio scope are transpiled.
        /@underdogio\/.*/
      ]
    })
  ],

  node: {
    // Disable shimming of node globals
    __dirname: false,
    process: false
  },

  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },

  module: {
    rules: [{
      // Allow Sass files to be imported server side.
      test: /\.(s?)css/,
      use: [{
        loader: 'css-loader'
      }, {
        loader: 'sass-loader',
        options: {
          includePaths: [
            // Allow importing from node_modules without having to specify path to node_modules directory.
            join(cwd, 'node_modules')
          ]
        }
      }]
    }, {
      test: fileLoader.test,
      use: [{
        loader: 'file-loader',
        options: Object.assign({}, fileLoader.options, {
          emitFile: false
        })
      }]
    }]
  },

  plugins: [
    new SourceMapSupportPlugin()
  ]
});
