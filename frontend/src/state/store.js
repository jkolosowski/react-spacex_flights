import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import logger from 'redux-logger';

import { createMiddleware } from 'redux-api-middleware';

import reducers from './ducks/flights/reducers';
import rocketReducers from './ducks/rockets/reducers';
import entitiesReducers from './ducks/entities';

const rootReducer = combineReducers({ ...entitiesReducers, ...reducers, ...rocketReducers });
const store = createStore(rootReducer, applyMiddleware(thunk, createMiddleware(), logger));

export default store;
