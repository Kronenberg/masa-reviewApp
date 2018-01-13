import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'

// @REDUCERS
import testReducer from './testReducer';
import groupReducer from './groupReducer';
// @ROOT REDUCER
const rootRecuer =  combineReducers({
  testReducer: testReducer,
  groupReducer: groupReducer,
  firebase: firebaseReducer
});

export default rootRecuer;