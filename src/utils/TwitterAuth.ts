import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
import crypto from 'crypto';

export class TwitterAuth {
  static buildOAuthHeader(): string {
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
    return '';
  }

  static async getRequestToken(): Promise<string> {
    const oauth_header = this.buildOAuthHeader();
    const callback_url = 'https://localhost:3000/twitter/oauth';
    const requestTokenUrl = `https://api.twitter.com/oauth/request_token?oauth_callback=${callback_url}`;
    const requestTokenResponse = await fetch(requestTokenUrl, {
      headers: {
        'Authorization': oauth_header
      }
    });
    const requestToken = requestTokenResponse.text();
  
    return requestToken;
  }

  static async authoriseUser(requestToken: Promise<string>) {
  /** Use request token to authorize user */
    // https://developer.twitter.com/en/docs/authentication/api-reference/authorize
    const authorisationUrl = 'https://api.twitter.com/oauth/authorize';
    const result = await fetch(`${authorisationUrl}?oauth_token=${requestToken}`);
  }
}