import passport from 'passport';
import { PassportProfile } from './interfaces/PassportProfile';
import { Jwt } from './jwt';
const TwitterTokenStrategy = require('passport-twitter-token');

export const Passport = () => {
  passport.use(new TwitterTokenStrategy({
    consumerKey: `${process.env.REACT_APP_OAUTH_CONSUMER_KEY}`,
    consumerSecret: `${process.env.REACT_APP_OAUTH_CONSUMER_SECRET}`,
    includeEmail: true
  },
  (token: string, tokenSecret: string, profile: PassportProfile, done: any) => {
    Jwt.User.upsertTwitterUser(token, tokenSecret, profile, (err: any, user: any) => {
      return done(err, user);
    });
  }));
}