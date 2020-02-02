/*
 *
 * RegisterPage reducer
 *
 */
import produce from 'immer';
import Actions, { DEFAULT_ACTION } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const registerPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Actions.REGISTER.REQUEST:
        draft.isLoading = true;
        break;
      case Actions.REGISTER.SUCCEED:
        draft.isLoading = false;
        break;
      case Actions.REGISTER.FAILED:
        draft.isLoading = false;
        break;
      case Actions.INPUT.EMAIL_CHANGED:
        draft.email = action.email;
        break;
      case Actions.INPUT.PASSWORD_CHANGED:
        draft.password = action.password;
        break;
      case Actions.INPUT.PASSWORD_CONF_CHANGED:
        draft.passwordConf = action.passwordConf;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default registerPageReducer;
