const isProduction = require('./util/is-production');

// Default options for file loader
module.exports = {
  // Replace urls for imported files. This is useful for appending chunkhashes to filenames for long term caching.
  test: /\.(eot|gif|jpg|jpeg|png|svg|ttf|woff|woff2)$/,
  options: {
    emitFile: false,
    name: `[name]${isProduction ? '.[hash]' : ''}.[ext]`
  }
};
