import passport from 'passport';
import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import jwt from 'jsonwebtoken';

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
    return res.json(errors);
  }
  console.log('here');
  passport.authenticate(
    'local',
    { session: false },
    (err: Error, user: UserDocument, info: IVerifyOptions) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(info.message);
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const token = jwt.sign({ id: user.id, email: user.email }, 'secrete');
        return res.json({ user, token });
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

  if (existingUser) {
    return res.json({ message: 'Email already registered' });
  }
  await user.save();
  return res.json(user);
};
