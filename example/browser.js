import React from 'react';
import {hydrate} from 'react-dom';

import Application from './app';

hydrate(
  <Application />,
  document.getElementById('app')
);
