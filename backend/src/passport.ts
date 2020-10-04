import passport from 'passport';
import { Jwt } from './jwt';
const TwitterTokenStrategy = require('passport-twitter-token');

export const Passport = () => {
  passport.use(new TwitterTokenStrategy({
    consumerKey: `${process.env.REACT_APP_OAUTH_CONSUMER_KEY}`,
    consumerSecret: `${process.env.REACT_APP_OAUTH_CONSUMER_SECRET}`,
    includeEmail: true
  },
  function (token: any, tokenSecret: any, profile: any, done: any) {
    Jwt.User.upsertTwitterUser(token, tokenSecret, profile, function(err: any, user: any) {
      return done(err, user);
    });
  }));
}