import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { statisticSaga } from './statisticSaga';
import { shoppingListSaga } from './shoppingListSaga';
import { shoppingCartSaga } from './shoppingCartSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    statisticSaga(),
    shoppingListSaga(),
    shoppingCartSaga(),
  ]);
}