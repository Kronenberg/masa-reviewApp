import { combineReducers } from 'redux';

// @REDUCERS
import testReducer from './testReducer';

// @ROOT REDUCER
const rootRecuer =  combineReducers({
  testReducer
});

export default rootRecuer;