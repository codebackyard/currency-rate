/*
 *
 * LoginPage actions
 *
 */

import Actions, { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loginRequest() {
  return {
    type: Actions.LOGIN.REQUEST,
  };
}

export function loginSucceed() {
  return {
    type: Actions.LOGIN.SUCCEED,
  };
}

export function loginFailed() {
  return {
    type: Actions.LOGIN.FAILED,
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
