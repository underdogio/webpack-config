import './styles/app.scss';
import React, {Component} from 'react';
import logo from './logo.svg';

class Application extends Component {
  render () {
    return (
      <main>
        <img alt="Underdog.io logo" src={logo} />
        <h1>Webpack Config</h1>
        <p>
          It worked!
        </p>
      </main>
    );
  }
}

export default Application;
