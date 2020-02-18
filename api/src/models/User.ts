import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

export type UserDocument = mongoose.Document & {
  email: string;
  passowrd: string;
  tokens: AuthToken[];
  comparePassword: comparePasswordFunction;
};

export interface AuthToken {
  accessToken: string;
  kind: string;
}
type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: any, isMatch: any) => {}
) => void;

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    passowrd: { type: String },
    profile: {
      email: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function save(next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.passowrd, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) {
        return next(err);
      }
      user.passowrd = hash;
      return next();
    });
  });
});

const comparePassword: comparePasswordFunction = function(
  candidatePassword,
  cb
) {
  bcrypt.compare(
    candidatePassword,
    this.passowrd,
    (err: mongoose.Error, isMatch: Boolean) => {
      cb(err, isMatch);
    }
  );
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>('User', userSchema);
