/*
 *
 * Auth reducer
 *
 */
import produce from 'immer';

export const Actions = {
  LOGIN: 'app/Auth/LOGIN',
  LOGOUT: 'app/Auth/LOGOUT',
};

export const initialState = {
  isLoading: false,
  isAuth: false,
  user: null,
};

export function authLogin({ user }) {
  return {
    type: Actions.LOGIN,
    user,
  };
}
export function authLogout() {
  return {
    type: Actions.LOGOUT,
  };
}

/* eslint-disable default-case, no-param-reassign */
const AuthReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Actions.LOGIN:
        draft.isAuth = true;
        draft.user = action.user;
        break;
      case Actions.LOGOUT:
        draft.isAuth = false;
        draft.user = null;
        break;
    }
  });

export default AuthReducer;
