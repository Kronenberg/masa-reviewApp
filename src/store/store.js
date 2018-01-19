import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import firebase from 'firebase';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

// REMOTE REDUCERS
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import  { runTheApp } from '../actions/globalActions';
 
const fbConfig = {
	apiKey: "AIzaSyC29RdE1-GOOrw_db5EhI0bn4hrWhR3Z1s",
    authDomain: "masa-projects-posts.firebaseapp.com",
    databaseURL: "https://masa-projects-posts.firebaseio.com",
    projectId: "masa-projects-posts",
    storageBucket: "masa-projects-posts.appspot.com",
    messagingSenderId: "457533567638"
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