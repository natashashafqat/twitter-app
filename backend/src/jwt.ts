import * as jwt from 'jsonwebtoken';
const expressJWT = require('express-jwt');
import * as express from 'express';

export function createToken(auth: any) {
  return jwt.sign({
    id: auth.id
  },
  'my-secret',
  {
    expiresIn: 60 * 120
  });
};

export function generateToken(req: any, res: any, next: any) {
  req.token = createToken(req.auth);
  return next();
};

export function sendToken(req: any, res: express.Response) {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

export const authenticate = expressJWT({
  secret: 'my-secret',
  requestProperty: 'auth',
  getToken: (req: any) => {
    if (req.headers['x-auth-tokenn']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});