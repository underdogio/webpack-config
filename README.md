# webpack-config

Base webpack config for browser and Node targets.

## Example usage

```javascript
// webpack.config.js
const baseConfig = require('@underdogio/webpack-config');
const {join} = require('path');
const merge = require('webpack-merge');

const browser = merge(baseConfig.browser, {
  entry: {
    app: join(__dirname, 'src/app')
  },
  output: {
    path: join(__dirname, 'dist')
  }
});

const server = merge(baseConfig.server, {
  entry: {
    server: join(__dirname, 'src/server')
  },
  output: {
    path: join(__dirname, 'dist/server')
  }
});

module.exports = [
  browser,
  server
]
```

You can take a look at an example setup for a server-rendered React app [here](https://github.com/underdogio/webpack-config/tree/master/example).

## Installing

```bash
yarn add @underdogio/webpack-config
```
