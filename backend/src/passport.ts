var passport = require('passport'),
  TwitterTokenStrategy = require('passport-twitter-token'),
  twitterConfig = require('../twitter.config.js');

var User = require('mongoose').model('User');

module.exports = function () {

  passport.use(new TwitterTokenStrategy({
      consumerKey: `${process.env.REACT_APP_OAUTH_CONSUMER_KEY}`,
      consumerSecret: `${process.env.REACT_APP_OAUTH_CONSUMER_SECRET}`,
      includeEmail: true
    },
    function (token: any, tokenSecret: any, profile: any, done: any) {
      User.upsertTwitterUser(token, tokenSecret, profile, function(err: any, user: any) {
        return done(err, user);
      });
    }));
};