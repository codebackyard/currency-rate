/*
 *
 * RegisterPage actions
 *
 */

import Actions, { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function register() {
  return {
    type: Actions.REGISTER.REQUEST,
  };
}

export function registerSucceed() {
  return {
    type: Actions.REGISTER.SUCCEED,
  };
}

export function registerFailed() {
  return {
    type: Actions.REGISTER.FAILED,
  };
}

export function inputEmailChanged({ email }) {
  return {
    type: Actions.INPUT.EMAIL_CHANGED,
    email,
  };
}

export function inputPasswordChanged({ password }) {
  return {
    type: Actions.INPUT.PASSWORD_CHANGED,
    password,
  };
}

export function inputPasswordConfChanged({ passwordConf }) {
  return {
    type: Actions.INPUT.PASSWORD_CONF_CHANGED,
    passwordConf,
  };
}
