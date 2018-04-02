const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const {join} = require('path');
const merge = require('webpack-merge');

const baseConfig = require('../src');

const overrides = {
  output: {
    publicPath: '/'
  }
};

const browser = merge.smart(baseConfig.browser, overrides, {
  entry: {
    app: join(__dirname, 'browser')
  },
  output: {
    path: join(__dirname, 'dist/static')
  },
  plugins: [
    new CleanPlugin([
      join(__dirname, 'dist/static'),
      join(__dirname, 'dist/html')
    ]),
    new HtmlPlugin({
      template: join(__dirname, 'app.html'),
      filename: join(__dirname, 'dist/html/app.html')
    })
  ]
});

const server = merge.smart(baseConfig.server, overrides, {
  entry: {
    server: join(__dirname, 'server')
  },
  output: {
    path: join(__dirname, 'dist/server'),
    filename: 'index.js'
  },
  plugins: [
    new CleanPlugin([
      join(__dirname, 'dist/server')
    ])
  ]
});

module.exports = [
  browser,
  server
];
