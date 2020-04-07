import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { receiptsSaga } from './receiptsSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    receiptsSaga()
  ]);
}