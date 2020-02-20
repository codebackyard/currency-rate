import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
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
    password: { type: String },
    profile: {
      email: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function save(next) {
  const user = this as UserDocument;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      return next();
    });
  });
});

const comparePassword: comparePasswordFunction = function(
  candidatePassword,
  cb
) {
  console.log(candidatePassword);
  console.log(this.password);

  if (this.password != null) {
    bcrypt.compare(
      candidatePassword,
      this.password,
      (err: mongoose.Error, isMatch: Boolean) => {
        console.log(`its match? ${isMatch}`);
        cb(err, isMatch);
      }
    );
  }
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>('User', userSchema);
