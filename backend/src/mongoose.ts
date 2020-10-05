import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { PassportProfile } from './interfaces/PassportProfile';

dotenv.config({path: path.join(__dirname, '../.env.development')});

export const Mongoose = () => {
  const db = mongoose.connect(`${process.env.REACT_APP_MONGO_URL}`);

  const UserSchema = new Schema({
    email: {
      type: String, required: true,
      trim: true, unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    twitterProvider: {
      type: {
        id: String,
        token: String
      },
      select: false
    }
  });

  UserSchema.set('toJSON', {getters: true, virtuals: true});

  UserSchema.statics.upsertTwitterUser = function(token: string, tokenSecret: string, profile: PassportProfile, cb: any) {
    this.findOne({
      'twitterProvider.id': profile.id
    }, (err: any, user: any) => {
      if (!user) {
        const newUser = new this({
          email: profile.emails[0].value,
          twitterProvider: {
            id: profile.id,
            token,
            tokenSecret
          }
        });

        newUser.save((error: Error, savedUser: any) => {
          if (error) {
            console.log(error.message);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    });
  };

  mongoose.model('User', UserSchema);
  return db;
}