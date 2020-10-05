import { Response } from "express";
import { Request } from "express-serve-static-core";
import passport from 'passport';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import * as request from 'request';
import dotenv from 'dotenv';
import { Jwt } from './src/jwt';
import { Passport } from './src/passport';

const router = express.Router();
dotenv.config({path: __dirname + '/.env.development'});
Passport();

const setupApp = () => {
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
}

setupApp();

router.route('/health-check').get((req: Request, res: Response) => {
  res.status(200).send('Healthy service');
});

router.route('/auth/twitter/reverse')
  .post((_req: Request, res: Response) => {
    request.post({
      uri: `${process.env.REACT_APP_REQUEST_TOKEN_URL}`,
      oauth: {
        callback: `${process.env.REACT_APP_CALLBACK_URL}`,
        consumer_key: `${process.env.REACT_APP_OAUTH_CONSUMER_KEY}`,
        consumer_secret: `${process.env.REACT_APP_OAUTH_CONSUMER_SECRET}`
      }
    },
    (err: Error, _r: any, body: string) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      const jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    });
  });

router.route('/auth/twitter')
  .post((req: Request, res: Response, next: any) => {
    request.post({
      uri: `${process.env.REACT_APP_OAUTH_VERIFIER_URL}`,
      oauth: {        
        consumer_key: `${process.env.REACT_APP_OAUTH_CONSUMER_KEY}`,
        consumer_secret: `${process.env.REACT_APP_OAUTH_CONSUMER_SECRET}`,
        token: `${req.query.oauth_token}`
      },
      form: {
        oauth_verifier: req.query.oauth_verifier,
      }
    },
    (err: Error, _r: any, body: string) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      const parsedBody = JSON.parse(bodyString);

      req.body['oauth_token'] = parsedBody.oauth_token;
      req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
      req.body['user_id'] = parsedBody.user_id;

      next();
    });
  },
  passport.authenticate('twitter-token', {session: false}),
  (req: any, res: any, next: any) => {
      if (!req.user) {
        return res.send(401, 'User Not Authenticated');
      }

      req.auth = {
        id: req.user.id
      };

      return next();
    }, Jwt.generateToken, Jwt.sendToken);

router.route('/auth/me').get(
  Jwt.authenticate,
  Jwt.getCurrentUser,
  Jwt.getOne
);