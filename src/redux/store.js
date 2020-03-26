import { createStore, combineReducers } from "redux";

import rootReducer from './reducers/rootReducer';

export const store = createStore(
  combineReducers({
    root: rootReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);