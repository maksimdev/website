import { call, put, takeLatest } from 'redux-saga/effects';
import { Api } from '../../api/Api';
import { convertValueToMoneyFormat } from '../../utils/utils'; 
import moment from 'moment';
import {
  loadStatisticSuccess,
  loadStatisticError,
  setStatisticSuccess,
  setStatisticError,
  LOADING_STATISTIC,
  SET_DATE
} from '../reducers/statisticReducer';

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

function* setData({ payload: { date }}) {
  try {
    const year = moment(date).years();
    const month = moment(date).month();
    const data = yield call(Api.getStatistic, year, month + 1);
    yield put(setStatisticSuccess(data));
  } catch (err) {
    yield put(setStatisticError({ error: 'Error: smth went wrong' }));
  }
}

export function* statisticSaga() {
  yield takeLatest(LOADING_STATISTIC, loadData);
  yield takeLatest(SET_DATE, setData);
}