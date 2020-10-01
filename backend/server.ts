var mongoose = require('./src/mongoose');
var passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const dotenv = require('dotenv');

dotenv.config({path: __dirname + '/.env.development'});

mongoose();

const passportConfig = require('./src/passport');
passportConfig();

var User = require('mongoose').model('User');

const app = express();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api/v1', router);
app.listen(4000);

router.route('/health-check').get(function(req: any, res: any) {
  res.status(200);
  res.send('Hello World');
});

router.route('/callback').get(function(req: any, res: any) {
  res.status(200);
  res.send('Successful login');
});

const createToken = function(auth: any) {
  return jwt.sign({
    id: auth.id
  }, 'my-secret',
  {
    expiresIn: 60 * 120
  });
};

const generateToken = function (req: any, res: any, next: any) {
  req.token = createToken(req.auth);
  return next();
};

const sendToken = function (req: any, res: any) {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

router.route('/auth/twitter/reverse')
  .post(function(req: any, res: any) {
    request.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2F",
        consumer_key: `${process.env.REACT_APP_OAUTH_CONSUMER_KEY}`,
        consumer_secret: `${process.env.REACT_APP_OAUTH_CONSUMER_SECRET}`
      }
    }, function (err: any, r: any, body: any) {
      if (err) {
        return res.send(500, { message: err.message });
      }

      const jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    });
  });

router.route('/auth/twitter')
  .post((req: any, res: any, next: any) => {
    request.post({
      url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
      oauth: {
        consumer_key: `${process.env.REACT_APP_OAUTH_CONSUMER_KEY}`,
        consumer_secret: `${process.env.REACT_APP_OAUTH_CONSUMER_SECRET}`,
        token: req.query.oauth_token
      },
      form: { oauth_verifier: req.query.oauth_verifier }
    }, function (err: any, r: any, body: any) {
      if (err) {
        return res.send(500, { message: err.message });
      }

      const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      const parsedBody = JSON.parse(bodyString);

      req.body['oauth_token'] = parsedBody.oauth_token;
      req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
      req.body['user_id'] = parsedBody.user_id;

      next();
    });
  }, passport.authenticate('twitter-token', {session: false}), function(req: any, res: any, next: any) {
      if (!req.user) {
        return res.send(401, 'User Not Authenticated');
      }

      req.auth = {
        id: req.user.id
      };

      return next();
    }, generateToken, sendToken);

module.exports = app;