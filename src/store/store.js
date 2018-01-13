import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';

// REMOTE REDUCERS
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import  { runTheApp } from '../actions/globalActions';

// @ACTIONS FOR FUN AND TEST
import * as TYPES from '../ActionsTYPES/TYPES';
 
const logger = createLogger();

let store = createStore(
	rootReducer,
	applyMiddleware(logger, thunk)
)


store.dispatch(runTheApp())

export default store;