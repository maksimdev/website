import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getAllShopingLists } from '../../api/Api';
import { loadingShopingListsSuccess, loadingShopingListsError } from '../reducers/shoppingListReducer';
import { ACTIONS } from '../../constants/constants'

function* loadData() {
  try {
    const data = yield call(getAllShopingLists, 100);
    yield put(loadingShopingListsSuccess(data));
  } catch (err) {
    yield put(loadingShopingListsError({error: 'Error: smth went wrong' }));
  } 
};

function* loadListById() {
  try {
    const data = yield call(getAllShopingLists, 2000);
    yield put(loadingListByIdSuccess(data));
  } catch (err) {
    yield put(loadingListByIdError({error: 'Error: smth went wrong' }));
  } 
};

export function* shoppingListSaga() {
  yield all([
    takeEvery(ACTIONS.LOADING_SHOPING_LIST, loadData),
    takeEvery(ACTIONS.LOADING_SHOPING_LIST_BY_ID, loadListById),
  ])
}