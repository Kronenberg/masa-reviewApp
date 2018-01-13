import {
    GET_ALL_GROUPS_PENDING,
    GET_ALL_GROUPS_REJECTED,
    GET_ALL_GROUPS_SUCCESS
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

export default {
    getAllGroups
}
