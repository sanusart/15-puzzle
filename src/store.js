import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import asyncCalls from './middlewares/asyncCalls';

export default(initialState) => {

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(asyncCalls)
  );

};
