import { call, put, takeLatest } from 'redux-saga/effects';
import { Api } from '../../api/Api';
import { loadReceiptsError, loadReceiptsSuccess } from '../reducers/receiptsReducer';
import { ACTIONS } from '../../constants/constants'

function* loadData() {
  try {
    const data = yield call(Api.getReceipts);
    yield put(loadReceiptsSuccess(data));
  } catch (err) {
    yield put(loadReceiptsError({ isAuthenticated: false, user: '', error: 'Error: smth went wrong' }));
  }
}

export function* receiptsSaga() {
  yield takeLatest(ACTIONS.LOADING_RECEIPTS, loadData);
}