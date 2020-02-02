/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import Actions, { DEFAULT_ACTION } from './constants';

export const initialState = {
  isLoading: false,
  email: '',
  password: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Actions.INPUT.EMAIL_CHANGED:
        draft.email = action.email;
        break;
      case Actions.INPUT.PASSWORD_CHANGED:
        draft.password = action.password;
        break;
      case Actions.LOGIN.REQUEST:
        draft.isLoading = true;
        break;
      case Actions.LOGIN.SUCCEED:
        draft.isLoading = false;
        break;
      case Actions.LOGIN.FAILED:
        draft.isLoading = false;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default loginPageReducer;
