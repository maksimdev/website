import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer';
import statisticReducer from './statisticReducer';
import receiptsReducer from './receiptsReducer';

export default {
  routing: routerReducer,
  auth: authReducer,
  statistic: statisticReducer,
  receipts: receiptsReducer
};