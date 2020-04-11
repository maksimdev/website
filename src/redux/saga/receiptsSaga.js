import { call, put, takeLatest } from 'redux-saga/effects';
import { Api } from '../../api/Api';
import { loadReceiptsError, loadReceiptsSuccess, LOADING_RECEIPTS } from '../reducers/receiptsReducer';

function* loadData() {
  try {
    const data = yield call(Api.getReceipts);
    yield put(loadReceiptsSuccess(data));
  } catch (err) {
    yield put(loadReceiptsError({ isAuthenticated: false, user: '', error: 'Error: smth went wrong' }));
  }
}

export function* receiptsSaga() {
  yield takeLatest(LOADING_RECEIPTS, loadData);
}