import { call, put, takeLatest } from 'redux-saga/effects';
import { Api } from '../../api/Api';
import { loginRequestSuccess, loginRequestFailed } from '../reducers/authReducer';

export const LOGIN = 'LOGIN';
export function authorize(payload) {
  return {
    type: LOGIN,
    payload
  };
}

function* getToken({ payload: { user, password } }) {
  console.log('MOCK waiting request from API');
  const data = yield new Promise((resolve) => {
    setTimeout(() => resolve(), 3000);
  })
  yield put(loginRequestSuccess({ isAuthenticated: true, user: 'm.ashmetev@ya.ru', token: 'secretkeyhere123456789123456789' }));


  //API works fine!
  // try {
  //   const data = yield call(Api.login, user, password);
  //   console.log()
  //   if (data.token) {
  //     yield put(loginRequestSuccess({ isAuthenticated: true, user, token: data.token, error: '' }));
  //   } else {
  //     yield put(loginRequestFailed({ isAuthenticated: false, user: '', token: '', error: data }));
  //   }
  // } catch (err) {
  //   yield put(loginRequestFailed({ isAuthenticated: false, user: '', token: '', error: 'Error: smth went wrong' }));
  // }
}

export function* authSaga() {
  yield takeLatest('LOGIN', getToken);
}