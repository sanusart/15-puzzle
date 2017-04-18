import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import asyncCalls from './middlewares/asyncCalls';

export default initialState => {

  const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

  const enhancer = composeEnhancers(applyMiddleware(asyncCalls));

  return createStore(
    rootReducer,
    initialState,
    enhancer
  );
};
