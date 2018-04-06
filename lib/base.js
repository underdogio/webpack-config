const {readFileSync} = require('fs');
const {join} = require('path');

function loadConfig (filename) {
  const path = join(__dirname, filename);
  const contents = readFileSync(path).toString();
  return JSON.parse(contents);
}

const babelConfig = loadConfig('.babelrc');
const eslintConfig = loadConfig('.eslintrc');

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
