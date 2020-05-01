import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Api } from '../../api/Api';
import { loadingShopingCartSuccess, loadingShopingCartError, addItemSuccess, addItemError, deleteItemSuccess, deleteItemError } from '../reducers/ShoppingCartReduser';
import { ACTIONS } from '../../constants/constants'

function* loadData({ id }) {
  try {
    const data = yield call(Api.getShopingCart, id);
    yield put(loadingShopingCartSuccess(data));
  } catch (err) {
    yield put(loadingShopingCartError({error: 'Error: smth went wrong' }));
  } 
};

function* addItem({ title, amount, category, status, listId }) {
  try {
    const data = yield call(Api.addItem, listId, title, category, amount, status);
    yield put(addItemSuccess(data));
  } catch (err) {
    yield put(addItemError({error: err }));
  } 
};

function* deleteItem({ id }) {
  try {
    const data = yield call(Api.deleteItem, id);
    yield put(deleteItemSuccess(data.id));
  } catch (err) {
    yield put(deleteItemError({error: err }));
  } 
};

export function* shoppingCartSaga() {
  yield all([
    takeEvery(ACTIONS.LOADING_SHOPING_CART, loadData),
    takeEvery(ACTIONS.ADD_ITEM, addItem),
    takeEvery(ACTIONS.DELETE_ITEM, deleteItem),
  ])
}