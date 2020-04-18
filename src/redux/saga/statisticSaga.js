import { call, put, takeLatest } from 'redux-saga/effects';
import { Api } from '../../api/Api';
import { convertValueToMoneyFormat } from '../../utils/utils'; 
import { loadStatisticError, loadStatisticSuccess, LOADING_STATISTIC } from '../reducers/statisticReducer';

function* loadData() {
  const getTotal = data => data.reduce((acc, { sum }) => acc += +sum, 0);
  const convertToDate = date => date.split('T')[0];

  try {
    const data = yield call(Api.getStatistic);
    const response = {
      total: convertValueToMoneyFormat(getTotal(data)),
      currentMonth: data.map(item => ({ ...item, date: convertToDate(item.date) }))
    };
    yield put(loadStatisticSuccess(response));
  } catch (err) {
    yield put(loadStatisticError(err));
  }
}

export function* statisticSaga() {
  yield takeLatest(LOADING_STATISTIC, loadData);
}