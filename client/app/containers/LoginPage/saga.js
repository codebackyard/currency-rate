import { put, select, takeEvery } from 'redux-saga/effects';
import history from 'utils/history';
import { loginSucceed, loginFailed } from './actions';
import Actions from './constants';
import {
  makeSelectLoginEmail,
  makeSelectLoginPassword,
  makeSelectAuth,
} from './selectors';
import Routes from '../../routes';
import { authLogin } from '../../reducers/auth';

function* login() {
  try {
    // const email = yield select(makeSelectLoginEmail());
    // const password = yield select(makeSelectLoginPassword());

    // @TODO: implement auth

    const user = {
      firstName: 'Sepehr',
      lastName: 'Hosseini',
    };

    yield put(loginSucceed({ user }));
    yield put(authLogin({ user }));

    history.push(Routes.profile.path);
  } catch (e) {
    console.log('error', e);
    yield put(loginFailed());
  }
}

// Individual exports for testing
export default function* loginPageSaga() {
  yield takeEvery(Actions.LOGIN.REQUEST, login);
  // See example in containers/HomePage/saga.js
}
