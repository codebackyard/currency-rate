import passport from 'passport';
import passportLocal from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import _ from 'lodash';
import { User, UserDocument } from '../models/User';
import { Request, Response, NextFunction } from 'express';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    console.log('noooo');

    User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
      if (err) {
        return done(err);
      }
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        console.log(user);
        console.log(isMatch);

        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(undefined, user);
        }
        return done(undefined, false, { message: 'Invalid email or password' });
      });
    });
  })
);

const jwtOpts = {
  secretOrKey: 'secrete',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(
  new JWTStrategy(jwtOpts, function(jwt_payload, done) {
    console.log(jwt_payload);

    User.findOne({ id: jwt_payload.sub }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ msg: 'you are not authenticated' });
};

export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const provider = req.path.split('/').slice(-1)[0];

  const user = req.user as UserDocument;
  if (_.find(user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
