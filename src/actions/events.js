import { SAVE_POST, FETCH_POSTS, EMAIL_SENDED, EMAIL_DISPATCH_ERROR } from '../ActionsTYPES/TYPES'


export const savePost = (post) =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        firebase.database().ref(`groups/${post.groupTitle}/posts`)
            .push(post)
            .then(() => {
                dispatch({ type: SAVE_POST, payload: 'Success' })
            })
            .catch((err) => {
                dispatch({ type: SAVE_POST, payload: err })
            })
    }

export const fetchPosts = (groupTitle) => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    const posts = firebase.database().ref(`groups/${groupTitle}/posts`)

    posts.on('value', function (snapshot) {
        dispatch({ type: FETCH_POSTS, payload: snapshot.val() || [] })
    });
};

