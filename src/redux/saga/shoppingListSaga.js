import { call, put, takeEvery } from 'redux-saga/effects';
import { Api } from '../../api/Api';
import { loadingShopingListsSuccess, loadingShopingListsError } from '../reducers/shoppingListReducer';
import { ACTIONS } from '../../constants/constants'

function* loadData() {
  try {
    const data = yield call(Api.getShopingLists);
    yield put(loadingShopingListsSuccess(data));
  } catch (err) {
    yield put(loadingShopingListsError({error: 'Error: smth went wrong' }));
  } 
};

export function* shoppingListSaga() {
  yield takeEvery(ACTIONS.LOADING_SHOPING_LIST, loadData)
}