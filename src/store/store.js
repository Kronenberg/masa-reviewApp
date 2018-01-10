import { applyMiddleware, compose, createStore } from 'redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

// REMOTE REDUCERS
import { createLogger } from 'redux-logger'
// @ACTIONS FOR FUN AND TEST
import * as TYPES from '../ActionsTYPES/TYPES';

//const logger = createLogger();

const fbConfig = {
	apiKey: "AIzaSyBxeJ64H8GH4NXT_fy5S0ATdG9w4fAKfmk",
	authDomain: "masa-wall.firebaseapp.com",
	databaseURL: "https://masa-wall.firebaseio.com",
	projectId: "masa-wall",
	storageBucket: "masa-wall.appspot.com",
	messagingSenderId: "1008969413809"
}

const rrfConfig = {
	userProfile: 'users',
	// useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}
firebase.initializeApp(fbConfig)
const initialState = {}


const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(thunk.withExtraArgument(getFirebase)), // Pass getFirebase function as extra argument
		reactReduxFirebase(firebase, rrfConfig)
	)
);

export default store;