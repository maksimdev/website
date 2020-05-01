import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Api } from '../../api/Api';
import { loadingShopingListsSuccess, loadingShopingListsError, addListSuccess, addListError, deleteListSuccess, deleteListError, editListSuccess, editListError } from '../reducers/shoppingListReducer';
import { ACTIONS } from '../../constants/constants'

function* loadData() {
  try {
    const data = yield call(Api.getShopingLists);
    yield put(loadingShopingListsSuccess(data));
  } catch (err) {
    yield put(loadingShopingListsError({error: 'Error: smth went wrong' }));
  } 
};

function* addList({ title }) {
  try {
    const list = yield call(Api.addList, title);
    yield put(addListSuccess(list));
  } catch (error) {
    yield put(addListError(error));
  }
};

function* deleteList({ id }) {
  try {
    yield call(Api.deleteList, id);
    yield put(deleteListSuccess(id));
  } catch (error) {
    yield put(deleteListError(error));
  }
};

function* editList({ id, title }) {
  try {
    console.log('id, title: ', id, title)
    yield call(Api.editList, id, title);
    yield put(editListSuccess(id, title));
  } catch (error) {
    yield put(editListError(error));
  }
};

export function* shoppingListSaga() {
  yield all([
    takeEvery(ACTIONS.LOADING_SHOPING_LIST, loadData),
    takeEvery(ACTIONS.ADD_LIST, addList),
    takeEvery(ACTIONS.DELETE_LIST, deleteList),
    takeEvery(ACTIONS.EDIT_LIST, editList),
  ])
};