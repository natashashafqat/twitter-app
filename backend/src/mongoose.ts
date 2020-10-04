import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const Mongoose = () => {
  const db = mongoose.connect('mongodb://localhost:27017/twitter-demo');

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

  UserSchema.statics.upsertTwitterUser = function(token: any, tokenSecret: any, profile: any, cb: any) {
    const that = this;
    return this.findOne({
      'twitterProvider.id': profile.id
    }, function(err: any, user: any) {
      if (!user) {
        const newUser = new that({
          email: profile.emails[0].value,
          twitterProvider: {
            id: profile.id,
            token: token,
            tokenSecret: tokenSecret
          }
        });

        newUser.save(function(error: any, savedUser: any) {
          if (error) {
            console.log(error);
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