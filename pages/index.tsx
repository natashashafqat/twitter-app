import React, { Component } from 'react';
import App from '../src/components/AppComponent';
import NavBarComponent from '../src/components/NavBarComponent';
import { TwitterAuth } from '../src/utils/TwitterAuth';

class Index extends Component {
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

export const getServerSideProps = async () => {
  const requestToken = TwitterAuth.getRequestToken();
  const authResult = TwitterAuth.authoriseUser(requestToken);

  return {
    props: {

    }
  };
}
