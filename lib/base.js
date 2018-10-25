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
      // Transpile modules in the @underdogio scope, and ignore all others.
      exclude: /node_modules\/(?!((@?)tippy\.js\/.*|@underdogio\/.*)).*/,
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
  },
  resolveLoader: {
    // Look for loaders in the local node_modules modules directory, as well as the node_modules
    // directory in the current working directory (webpack does not do this for us automatically).
    modules: [
      'node_modules',
      join(process.cwd(), 'node_modules'),
      join(__dirname, '../node_modules')
    ],
    extensions: ['.js', '.json'],
    mainFields: [
      'loader',
      'main'
    ]
  }
};
