import { call, put, takeLatest } from 'redux-saga/effects';
import { Api } from '../../api/Api';
import { loadStatistic, loadStatisticError, loadStatisticSuccess } from '../reducers/statisticReducer';
import { ACTIONS } from '../../constants/constants';

function* loadData() {
  let data = yield new Promise((resolve) => {
    setTimeout(() => resolve(), 5000);
  })
  data = {
    total: 23100,
    currentMonth: [
      { date: '01/04', amount: 1000 },
      { date: '05/04', amount: 3000 },
      { date: '06/04', amount: 700 },
      { date: '07/04', amount: 2000 },
    ]
    
  };
  yield put(loadStatisticSuccess(data));


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

export function* statisticSaga() {
  yield takeLatest(ACTIONS.LOADING_STATISTIC, loadData);
}