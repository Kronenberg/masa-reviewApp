import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
// @REDUCERS
import testReducer from './testReducer';
import messagesReducer from './messagesReducer';

// @ROOT REDUCER
const rootRecuer =  combineReducers({
  testReducer,
  messages: messagesReducer,
  firebase: firebaseReducer
});

export default rootRecuer;