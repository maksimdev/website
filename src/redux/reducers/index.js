import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer';
import statisticReducer from './statisticReducer';
import receiptsReducer from './receiptsReducer';
import shoppingListReducer from './shoppingListReducer';
import shoppingCartReducer from './ShoppingCartReduser';

export default {
  routing: routerReducer,
  auth: authReducer,
  statistic: statisticReducer,
  shoppingList: shoppingListReducer,
  shoppingCart: shoppingCartReducer,
};