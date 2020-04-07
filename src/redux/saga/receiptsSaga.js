import { call, put, takeLatest } from 'redux-saga/effects';
import { Api } from '../../api/Api';
import { loadReceipts, loadReceiptsError, loadReceiptsSuccess, LOADING_RECEIPTS } from '../reducers/receiptsReducer';

function* loadData() {
  let data = yield new Promise((resolve) => {
    setTimeout(() => resolve(), 3000);
  })
  data = [
    {id: 1, totalsum: 10000, shiftnumber: 20, datetime: '2020-03-21 15:23:00', status: 'pending'},
    {id: 2, totalsum: 2000, shiftnumber: 10, datetime: '2020-02-21 11:53:00', status: 'ready'},
    {id: 3, totalsum: 3000, shiftnumber: 25, datetime: '2020-01-20 13:03:00', status: 'ready'}
  ];
  yield put(loadReceiptsSuccess(data));


  //API works fine!
  // try {
  //   const data = yield call(Api.login, user, password);
  //   if (data.token) {
  //     localStorage.setItem("token", data.token);
  //     yield put(loginRequestSuccess({ isAuthenticated: true, user, error: '' }));
  //   } else {
  //     yield put(loginRequestFailed({ isAuthenticated: false, user: '', error: data }));
  //   }
  // } catch (err) {
  //   yield put(loginRequestFailed({ isAuthenticated: false, user: '', error: 'Error: smth went wrong' }));
  // }
}

export function* receiptsSaga() {
  yield takeLatest(LOADING_RECEIPTS, loadData);
}