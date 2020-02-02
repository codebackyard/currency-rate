import { put, select, takeLatest } from 'redux-saga/effects';
import Actions from './constants';
import { registerSucceed, registerFailed } from './actions';
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectPasswordConf,
} from './selectors';

function* register() {
  try {
    const email = yield select(makeSelectEmail());
    const password = yield select(makeSelectPassword());
    const passwordConf = yield select(makeSelectPasswordConf());

    console.log({
      email,
      password,
      passwordConf,
    });

    yield put(registerSucceed());
  } catch (e) {
    console.log('saga failed', e);
    yield put(registerFailed());
  }
}

// Individual exports for testing
export default function* registerPageSaga() {
  yield takeLatest(Actions.REGISTER.REQUEST, register);
  // See example in containers/HomePage/saga.js
}
