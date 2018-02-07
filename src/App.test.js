import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const assert = require('assert');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should have correct amount of currencies', () => {
  const Currencies = require('./currencies.js');
  const currenciesArray = Currencies.currenciesArray;
  assert.strictEqual(currenciesArray.length, 32);
});
