import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
// @REDUCERS
import testReducer from './testReducer';
import messagesReducer from './messagesReducer';
import notificationReducer from './notificationReducer';

// @ROOT REDUCER
const rootRecuer =  combineReducers({
  testReducer,
  messages: messagesReducer,
  notification: notificationReducer,
  firebase: firebaseReducer
});

export default rootRecuer;