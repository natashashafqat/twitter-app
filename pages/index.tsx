import React, { Component } from 'react';
import App from '../src/components/AppComponent';
import NavBarComponent from '../src/components/NavBarComponent';

class Index extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBarComponent />
        <App />
      </div>
    )
  }
}

export default Index;
