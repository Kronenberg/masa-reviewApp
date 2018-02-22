import {
    GET_ALL_GROUPS_PENDING,
    GET_ALL_GROUPS_REJECTED,
    GET_ALL_GROUPS_SUCCESS,
    WHO_IS_TYPING_SET_USER,
    SAVE_POST

} from '../ActionsTYPES/TYPES';

export const getAllGroups = () =>
  (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    
    dispatch({ type: GET_ALL_GROUPS_PENDING });
    
    const groups = firebase.database().ref('groups');

    groups.once("value")
    .then((snapshot) => {
        dispatch({ type: GET_ALL_GROUPS_SUCCESS, payload: snapshot.val() });
    })
    .catch((error) => {
        dispatch({ type: GET_ALL_GROUPS_REJECTED, payload: error });
    })
}

export const sendMessage = (post, accountColor) =>
    (dispatch, getState, getFirebase) => {

        if (!localStorage.getItem('userToken')) {
            return;
        }

        const m = {
            name: JSON.parse(localStorage.getItem('userToken')).userRoute,
            message: post,
            wasCreated: new Date().toString()
        }
        console.log(m)
        const firebase = getFirebase()
        firebase.database().ref(`messages/`)
            .push(m)
            .then(() => {
                dispatch({ type: SAVE_POST, payload: 'Success' })
            })
            .catch((err) => {
                dispatch({ type: SAVE_POST, payload: err })
            })
    }



export const WhoIsTypingSetUser = (message) =>
    (dispatch, getState, getFirebase) => {

        if (!localStorage.getItem('userToken')) {
            return;
        }

        let data = {
            user: JSON.parse(localStorage.getItem('userToken')).userRoute,
            message: message
        }

        const firebase = getFirebase()
        firebase.database().ref(`whoistyping/`)
            .set(data)
            .then(() => {
                dispatch({ type: WHO_IS_TYPING_SET_USER, payload: 'WHO_IS_TYPING_SUCCESS' })
            })
            .catch((err) => {
                dispatch({ type: SAVE_POST, payload: err })
            })
    }
