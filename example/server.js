import React from 'react';
import express from 'express';
import {join} from 'path';
import {renderFile} from 'swig-templates';
import {renderToString} from 'react-dom/server';

import Application from './app';

const server = express();

const VIEWS_PATH = join(__dirname, '../html');
server.engine('html', renderFile);
server.set('views', VIEWS_PATH);
server.set('view engine', 'html');

// Serve static files from static directory
const STATIC_PATH = join(__dirname, '../static');
server.use(express.static(STATIC_PATH));

// Render React app
server.use((req, res) => {
  const content = renderToString(<Application />);
  res.render('app', {
    content
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Listening on port ${PORT}`);
  /* eslint-enable */
});
