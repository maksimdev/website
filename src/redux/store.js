import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { routerReducer } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects';

import authReducer from './reducers/authReducer';
import rootReducer from './reducers/rootReducer';
import { appSaga } from './saga/appSaga'

function* rootSaga() {
  yield all([
    appSaga()
  ]);
}

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
: compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const initState = {};

export const store = createStore(
  combineReducers({
    routing: routerReducer,
    auth: authReducer,
    root: rootReducer
  }),
  initState,
  enhancer
);
sagaMiddleware.run(rootSaga);