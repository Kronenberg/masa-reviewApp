import {
    CREATE_ACCOUNT_PENDING,
    CREATE_ACCOUT_SUCCESS,
    CREATE_ACCOUNT_REJECTED,
    CREATE_ACCOUNT_TO_INITIAL,
    CREATE_ACCOUNT_TO_INITIAL_ERROR,
    LOGIN_ACCOUNT_PENDING,
    LOGIN_ACCOUNT_REJECTED,
    LOGIN_ACCOUNT_SUCCESS,
    EMAIL_VERIFIED_SUCCESS,
    EMAIL_VERIFIED_FAIL,
    AUTO_LOGIN_USER

} from '../ActionsTYPES/TYPES';
import { createFirebaseConnect } from 'react-redux-firebase';
import uuidv1 from 'uuid/v1';

// https://rnfirebase.io/
export const LoginViaFirebaseCustom = (email, password) =>
  (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    
    dispatch({ type: CREATE_ACCOUNT_PENDING });
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userData) => {
       
        console.log(userData)
        //localStorage.setItem("user", JSON.stringify({ email, "registration": true, "login": false }))
        dispatch({ type: CREATE_ACCOUNT_SUCCESS, payload: userData });
    })
    .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch({ type: CREATE_ACCOUNT_REJECTED, payload: errorMessage });
      });
}


export const createAccount = (email, password) =>
  (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    
    .then((userData)=>{
      
      // add this user to local storage
    
      //localStorage.setItem("user", JSON.stringify({ email, "registration": true, "login": false }))
      dispatch({ type: LOGIN_ACCOUNT_SUCCESS, payload: userData})
      
    })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch({ type: CREATE_ACCOUNT_REJECTED, payload: errorMessage });
      });
}

    .then(() => {
      if (firebase.auth().currentUser.emailVerified) {

        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
          const userRoute = email.split('@')[0]
          firebase.database().ref(`users/${userRoute}`)
            .set({email, token: idToken})
            .then(()=>{
              localStorage.setItem("userToken", JSON.stringify({ token: idToken, userRoute }))
            })
            .then(()=>{
              dispatch({type: EMAIL_VERIFIED_SUCCESS, payload: email});
            })
        })
      } else {


        dispatch({type: EMAIL_VERIFIED_FAIL});

export const createAccountToInitial = () => {
  (dispatch) => {
    dispatch({ type: CREATE_ACCOUNT_TO_INITIAL });
  }


export const createAccountToInitial = () => 
  (dispatch, getState, getFirebase)  => {
    const firebase = getFirebase();

    firebase.auth().signOut()

      .then(function() {
        localStorage.removeItem("userToken")
        dispatch({ type: CREATE_ACCOUNT_TO_INITIAL });
      })
      .catch(function(error) {
        dispatch({ type: CREATE_ACCOUNT_TO_INITIAL_ERROR, payload: error});
      });
}

export const verifyLogin = (userToken) =>
  (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    const users = firebase.database().ref('users/')
    users.once('value', function(snapshot) {
      if(userToken){
        const userData = snapshot.val()[userToken.userRoute];
        if (userToken.token === userData.token){
          dispatch({ type: AUTO_LOGIN_USER, payload: userData.email})

          const email = userData.email;
          const userRoute = email.split('@')[0]
          const token = uuidv1();

          firebase.database().ref(`users/${userRoute}`)
            .set({ email, token })
          localStorage.setItem("userToken", JSON.stringify({ token, userRoute }))

        }               
      }
    });
  }

export default {
    createAccount,
    createAccountToInitial
}