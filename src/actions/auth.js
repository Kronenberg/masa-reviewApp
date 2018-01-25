import {
    CREATE_ACCOUNT_PENDING,
    CREATE_ACCOUT_SUCCESS,
    CREATE_ACCOUNT_REJECTED,
    CREATE_ACCOUNT_TO_INITIAL
} from '../ActionsTYPES/TYPES';
import { createFirebaseConnect } from 'react-redux-firebase';

// https://rnfirebase.io/
// export const LoginViaFirebaseCustom = (email, password) =>
//   (dispatch, getState, getFirebase) => {
//     const firebase = getFirebase();
    
//     dispatch({ type: CREATE_ACCOUNT_PENDING });

    

//     firebase.auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then((userData) => {

//           console.log(firebase.auth().currentUser, 'auth user infi')
//           dispatch({ type: CREATE_ACCOUT_SUCCESS, payload: userData });
//       })
//       .catch((error) => {
//           // Handle Errors here.
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           console.log(firebase.auth().currentUser, 'auth user infi')
//           dispatch({ type: CREATE_ACCOUNT_REJECTED, payload: errorMessage });
//         });
// }


export const createAccount = (email, password) =>
  (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    
    dispatch({ type: CREATE_ACCOUNT_PENDING });
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userData) => {
       
        dispatch({ type: CREATE_ACCOUT_SUCCESS, payload: userData });
       
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

    dispatch({ type: CREATE_ACCOUNT_PENDING });

    firebase.auth().signInWithEmailAndPassword(email, password)
    
    .then((userData)=>{

    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }


export const createAccountToInitial = () => {
  (dispatch) => {
    dispatch({ type: CREATE_ACCOUNT_TO_INITIAL });
  }
}



export default {
    createAccount,
    createAccountToInitial
}