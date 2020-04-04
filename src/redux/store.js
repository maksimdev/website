import { createStore, combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'

import authReducer from './reducers/authReducer';
import rootReducer from './reducers/rootReducer';

export const store = createStore(
  combineReducers({
    routing: routerReducer,
    auth: authReducer,
    root: rootReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);