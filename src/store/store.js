import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import firebase from 'firebase';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

// REMOTE REDUCERS
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import  { runTheApp } from '../actions/globalActions';
 
const fbConfig = {
	apiKey: "AIzaSyBxeJ64H8GH4NXT_fy5S0ATdG9w4fAKfmk",
	authDomain: "masa-wall.firebaseapp.com",
	databaseURL: "https://masa-wall.firebaseio.com",
	projectId: "masa-wall",
	storageBucket: "masa-wall.appspot.com",
	messagingSenderId: "1008969413809"
	}

const config = {
	userProfile: 'users', // firebase root where user profiles are stored
	enableLogging: false, // enable/disable Firebase's database logging
}

const logger = createLogger();


firebase.initializeApp(fbConfig)
const initialState = {}


const store = createStore(
	rootReducer,
	initialState,
	compose(
	applyMiddleware(logger, thunk.withExtraArgument(getFirebase)), // Pass getFirebase function as extra argument
	reactReduxFirebase(firebase, config)
	)
);

// let store = createStore(
// 	rootReducer,
// 	applyMiddleware(logger, thunk)
// )


store.dispatch(runTheApp())

export default store;