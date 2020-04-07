import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { receiptsSaga } from './receiptsSaga';
import { statisticSaga } from './statisticSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    receiptsSaga(),
    statisticSaga()
  ]);
}