import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
: compose;

const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));

const initState = {};

export const store = createStore(
  combineReducers(rootReducer),
  initState,
  enhancers
);
sagaMiddleware.run(rootSaga);