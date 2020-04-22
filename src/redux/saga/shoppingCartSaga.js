import { call, put, takeEvery } from 'redux-saga/effects';
import { getShopingCart } from '../../api/Api';
import { loadingShopingCartSuccess, loadingShopingCartError } from '../reducers/ShoppingCartReduser';
import { ACTIONS } from '../../constants/constants'

function* loadData() {
  try {
    const data = yield call(getShopingCart, 100);
    yield put(loadingShopingCartSuccess(data));
  } catch (err) {
    yield put(loadingShopingCartError({error: 'Error: smth went wrong' }));
  } 
};

export function* shoppingCartSaga() {
  yield takeEvery(ACTIONS.LOADING_SHOPING_CART, loadData)
}