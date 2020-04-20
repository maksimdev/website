import moment from 'moment';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Api } from '../../api/Api';
import {
  loadStatisticError,
  loadStatisticSuccess,
} from '../reducers/statisticReducer';
import { ACTIONS } from '../../constants/constants';

function* loadData({ payload: { date }}) {
  try {
    const year = moment(date).years();
    const month = moment(date).month();
    const data = yield call(Api.getStatistic, year, month + 1);
    yield put(loadStatisticSuccess(data));
  } catch (err) {
    yield put(loadStatisticError({ error: 'Error: smth went wrong' }));
  }
}

export function* statisticSaga() {
  yield takeLatest(ACTIONS.SET_DATE, loadData);
}