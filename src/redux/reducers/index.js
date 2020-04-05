import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';

export default {
  routing: routerReducer,
  auth: authReducer,
  dashboard: dashboardReducer
};