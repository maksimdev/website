import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer';
import statisticReducer from './statisticReducer';
import shoppingListReducer from './shoppingListReducer'

export default {
  routing: routerReducer,
  auth: authReducer,
  statistic: statisticReducer,
  shoppingList: shoppingListReducer,
};