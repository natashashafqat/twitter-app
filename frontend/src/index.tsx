import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/AppComponent';
import * as dotenv from 'dotenv';

dotenv.config();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);