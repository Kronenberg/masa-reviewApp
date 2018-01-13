import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';

// REMOTE REDUCERS
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';

// @ACTIONS FOR FUN AND TEST
import * as TYPES from '../ActionsTYPES/TYPES';
 
const logger = createLogger();

let store = createStore(
	rootReducer,
	applyMiddleware(logger, thunk)
)



export default store;