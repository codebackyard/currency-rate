import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { loginSucceed, loginFailed } from './actions';
import Actions from './constants';
import { makeSelectLoginEmail, makeSelectLoginPassword } from './selectors';

function* login() {
  try {
    const email = yield select(makeSelectLoginEmail());
    const password = yield select(makeSelectLoginPassword());

    yield put(loginSucceed());
  } catch (e) {
    yield put(loginFailed());
  }
}

// Individual exports for testing
export default function* loginPageSaga() {
  yield takeEvery(Actions.LOGIN.REQUEST, login);
  // See example in containers/HomePage/saga.js
}
