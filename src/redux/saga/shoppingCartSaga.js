import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Api } from '../../api/Api';
import { loadingShopingCartSuccess, loadingShopingCartError, addItemSuccess, addItemError, deleteItemSuccess, deleteItemError, changeFlag, updateStatus } from '../reducers/ShoppingCartReduser';
import { ACTIONS } from '../../constants/constants'

function* loadData({ id }) {
  try {
    const data = yield call(Api.getShopingCart, id);
    yield put(loadingShopingCartSuccess(data));
  } catch (err) {
    yield put(loadingShopingCartError({error: 'Error: smth went wrong' }));
  } 
};

function* addItem({ title, amount, category, status, shoppinglistid }) {
  try {
    const data = yield call(Api.addItem, shoppinglistid, title, category, amount, status);
    yield put(addItemSuccess(data));
  } catch (err) {
    yield put(addItemError({error: err }));
  } 
};

function* deleteItem({ id }) {
  try {
    const data = yield call(Api.deleteItem, id);
    yield put(deleteItemSuccess(data.id));
  } catch(error) {
    yield put(deleteItemError({error}));
  } 
};

function* updateCheckBox({id, status}) {
  try {
    const data = yield call(Api.updateStatus, id, status);
     yield put(changeFlag(data));
  } catch(error) {
    console.log('error: ', error);
  }
};

export function* shoppingCartSaga() {
  yield all([
    takeEvery(ACTIONS.LOADING_SHOPING_CART, loadData),
    takeEvery(ACTIONS.ADD_ITEM, addItem),
    takeEvery(ACTIONS.DELETE_ITEM, deleteItem),
    takeEvery(ACTIONS.UPDATE_STATUS, updateCheckBox),
  ])
}