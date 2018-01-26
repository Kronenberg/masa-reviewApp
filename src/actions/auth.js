import {
    CREATE_ACCOUNT_PENDING,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_REJECTED,
    CREATE_ACCOUNT_TO_INITIAL,
    CREATE_ACCOUNT_TO_INITIAL_ERROR,
    LOGIN_ACCOUNT_PENDING,
    LOGIN_ACCOUNT_REJECTED,
    LOGIN_ACCOUNT_SUCCESS,
    EMAIL_VERIFIED_SUCCESS,
    EMAIL_VERIFIED_FAIL

} from '../ActionsTYPES/TYPES';
import { createFirebaseConnect } from 'react-redux-firebase';

export const createAccount = (email, password) =>
  (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    
    dispatch({ type: CREATE_ACCOUNT_PENDING });
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userData) => {
       
        localStorage.setItem("user", JSON.stringify({ email, "registration": true, "login": false }))
        dispatch({ type: CREATE_ACCOUNT_SUCCESS, payload: userData });
    })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch({ type: CREATE_ACCOUNT_REJECTED, payload: errorMessage });
      });
}

export const loginViaFirebase = (email, password) =>
  (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    dispatch({ type: LOGIN_ACCOUNT_PENDING });

    firebase.auth().signInWithEmailAndPassword(email, password)
    
    .then((userData)=>{
      
      // add this user to local storage
      localStorage.setItem("user", JSON.stringify({ email, "registration": true, "login": false }))
      dispatch({ type: LOGIN_ACCOUNT_SUCCESS, payload: userData})
      
    })

    .then(() => {
      if (firebase.auth().currentUser.emailVerified) {

        localStorage.setItem("user", JSON.stringify({ email, "registration": true, "login": true }))
        dispatch({type: EMAIL_VERIFIED_SUCCESS});

      } else {

        localStorage.setItem("user", JSON.stringify({ email, "registration": true, "login": false }))
        dispatch({type: EMAIL_VERIFIED_FAIL});

      }
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      dispatch({ type: LOGIN_ACCOUNT_REJECTED, payload: errorMessage })
    });
  }


export const createAccountToInitial = () => 
  (dispatch, getState, getFirebase)  => {
    const firebase = getFirebase();

    firebase.auth().signOut()

      .then(function() {
        localStorage.removeItem("user")
        dispatch({ type: CREATE_ACCOUNT_TO_INITIAL });
      })
      .catch(function(error) {
        dispatch({ type: CREATE_ACCOUNT_TO_INITIAL_ERROR, payload: error});
      });
}



export default {
    createAccount,
    createAccountToInitial
}