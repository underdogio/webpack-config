const {readFileSync} = require('fs');
const {join} = require('path');
const eslintConfig = require('../config/eslint');

const babelConfig = JSON.parse(readFileSync(join(__dirname, '..', 'config/.babelrc')).toString());

module.exports = {
  output: {
    publicPath: '/static'
  },
  module: {
    rules: [{
      test: /\.js(x?)/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: Object.assign({}, babelConfig, {
          cacheDirectory: true
        })
      }, {
        loader: 'eslint-loader',
        options: eslintConfig
      }]
    }]
  },
  resolve: {
    extensions: ['.js', 'json', '.jsx']
  }
};
