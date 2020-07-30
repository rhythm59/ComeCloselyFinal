import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

import * as reducers from './ducks';
import {createLogger} from './middlewares';

export default function configureStore(initialState: any) {
  const rootReducer = combineReducers(reducers);

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, createLogger(true)),
  );
}
