import React, { Component } from 'react';
import App from '../src/components/AppComponent';
import NavBarComponent from '../src/components/NavBarComponent';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
import crypto from 'crypto';

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

export const getServerSideProps = async () => {
  const oauth_consumer_key = serverRuntimeConfig.TWITTER_API_KEY;
  const nonceLen = 32;
  const oauth_nonce = crypto.randomBytes(Math.ceil(nonceLen * 3 / 4))
    .toString('base64')
    .slice(0, nonceLen)
    .replace(/\+/g, '0')
    .replace(/\//g, '0');
  
    /** Build oauth header */
  // oauth_signature -> https://developer.twitter.com/en/docs/authentication/oauth-1-0a/creating-a-signature
  // oauth_timestamp -> unix timestamp number of seconds e.g. 1318622958
  // oauth_token (user access token) -> PERSONAL_TWITTER_ACCESS_TOKEN
  // oauth_version -> 1.0

  /** Make request token call to request user authorization */
  // const requestTokenUrl = "https://api.twitter.com/oauth/request_token?oauth_callback="https://localhost:3000/twitter/oauth"";
  // const result = await fetch(requestTokenUrl, {
  //   headers: {
  //     'Authorization': 'oauth_string'
  //   }
  // });

  /** Use request token to authorize user */
  // https://developer.twitter.com/en/docs/authentication/api-reference/authorize


  return {
    props: {

    }
  };
}
