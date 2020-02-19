import passport from 'passport';
import { check, sanitize, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';

import '../config/passport';
import { User, UserDocument, AuthToken } from '../models/User';

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('email', 'Email is not valid')
    .isEmail()
    .run(req);
  await check('password', 'Password cannot be blank')
    .isLength({ min: 6 })
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res.json(errors);
  }
  passport.authenticate(
    'local',
    (err: Error, user: UserDocument, info: IVerifyOptions) => {
      console.log(`this  is: ${err} / ${info} / ${user}`);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(info.message);
      }

      console.log(`authenticated succeed: ${user}`);
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json(user);
      });
    }
  )(req, res, next);
};

export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('email', 'email is not valid')
    .isEmail()
    .run(req);
  await check('password', 'Password must be at least 6 character')
    .isLength({ min: 6 })
    .run(req);
  await check('confirmPassword', 'Password confirmation does not match')
    .equals(req.body.password)
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(errors);
  }

  const user = new User({ email: req.body.email, password: req.body.password });

  const existingUser = await User.findOne({ email: req.body.email });
  console.log(existingUser);

  if (existingUser) {
    return res.json({ message: 'Email already registered' });
  }
  await user.save();
  console.log(user);
  return res.json(user);
};
