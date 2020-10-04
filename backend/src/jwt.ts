import * as jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { Mongoose } from './mongoose';
Mongoose();

export class Jwt {
  static User = require('mongoose').model('User');

  static createToken = (auth: any) => {
    return jwt.sign({
      id: auth.id
    }, 'my-secret',
    {
      expiresIn: 60 * 120
    });
  };

  static generateToken = (req: any, res: any, next: any) => {
    req.token = Jwt.createToken(req.auth);
    return next();
  };

  static sendToken = (req: any, res: any) => {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
  };

  static authenticate = () => {
    return expressJwt({
      algorithms: ['RS256'],
      secret: 'my-secret',
      requestProperty: 'auth',
      getToken: (req: any) => {
        if (req.headers['x-auth-token']) {
          return req.headers['x-auth-token'];
        }
        return null;
      }
    })
  };

  static getCurrentUser = (req: any, res: any, next: any) => {
    return Jwt.User.findById(req.auth.id, (err: Error, user: any) => {
      if (err) {
        next(err);
      } else {
        req.user = user;
        next();
      }
    });
  };

  static getOne = (req: any, res: any) => {
    const user = req.user.toObject();
  
    delete user['twitterProvider'];
    delete user['__v'];
  
    res.json(user);
  };
}
