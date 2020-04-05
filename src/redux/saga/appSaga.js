import { call, put, takeLatest } from 'redux-saga/effects';

export const LOGIN = 'LOGIN';

export function authorize(payload) {
  return {
    type: LOGIN,
    payload
  };
}

function* getAsync(incomingData) {
  console.log('MOCK waiting request from API');
  console.log('INCOMING MESSAGE: ', incomingData);
  const data = yield new Promise((resolve) => {
    setTimeout(() => resolve(), 3000);
  })
  const data2 = { type: 'LOGIN_SUCCESS',  payload: { isAuthenticated: true, user: 'm.ashmetev@ya.ru', token: 'secretkeyhere123456789123456789' } };
  yield put(data2);
  // try {
  //   const data = yield call(userApi.getUserReports, user521);
  //   yield put(loadUserReportsSuccess(data));
  // } catch (err) {
  //   yield put(loadUserReportsError(err));
  // }
}

export function* appSaga() {
  yield takeLatest('LOGIN', getAsync);
}