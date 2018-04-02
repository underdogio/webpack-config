const eslintConfig = require('./eslint-config');

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
        options: {
          cacheDirectory: true,
          // Define default presets and plugins. These can be overriden with a local .babelrc file.
          presets: [
            ['@babel/env', {
              targets: {
                browsers: [
                  'last 2 versions'
                ],
                node: 'current'
              }
            }],
            '@babel/react'
          ],
          plugins: [
            '@babel/plugin-proposal-decorators',
            ['@babel/plugin-proposal-class-properties', {
              loose: true
            }],
            '@babel/plugin-proposal-object-rest-spread'
          ]
        }
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
