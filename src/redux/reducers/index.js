import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';
import receiptsReducer from './receiptsReducer';

export default {
  routing: routerReducer,
  auth: authReducer,
  receipts: receiptsReducer,
  dashboard: dashboardReducer
};