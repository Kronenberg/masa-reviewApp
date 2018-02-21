import { SAVE_POST, SAVE_COMMENT, DELETE_POST, FETCH_POSTS, FETCH_POST, FETCH_EVENTS, SAVE_EVENT, EMAIL_SENDED, EMAIL_DISPATCH_ERROR } from '../ActionsTYPES/TYPES'


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
export const addEvent = (event) =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        firebase.database().ref(`groups/${event.groupTitle}/calendar`)
            .push(event)
            .then(() => {
                dispatch({ type: SAVE_EVENT, payload: 'Success' })
            })
            .catch((err) => {
                dispatch({ type: SAVE_EVENT, payload: err })
            })
    }

export const fetchEvents = (groupTitle) => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    const posts = firebase.database().ref(`groups/${groupTitle}/calendar`)

    posts.on('value', function (snapshot) {

        dispatch({ type: FETCH_EVENTS, payload: snapshot.val() || [] })
    });
};


export const saveComment = (post) =>
    (dispatch, getState, getFirebase) => {
        console.log(post)
        const firebase = getFirebase()
        firebase.database().ref(`groups/${post.groupTitle}/posts/${post.id}/comments`)
            .push(post)
            .then(() => {
                dispatch({ type: SAVE_COMMENT, payload: 'Success' })
            })
            .catch((err) => {
                dispatch({ type: SAVE_COMMENT, payload: err })
            })
    }

export const deletePost = (postId, groupTitle, userEmail) =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()

        const user = firebase.auth().currentUser;
        console.log(user.email, userEmail, postId)
        if (user && user.email === userEmail){
            firebase.database().ref(`groups/${groupTitle}/posts/${postId}/`)
                .remove()
                .then(() => {
                    dispatch({ type: DELETE_POST, payload: 'Success' })
                })
                .catch((err) => {
                    dispatch({ type: DELETE_POST, payload: err })
                })
        }else{
            dispatch({ type: DELETE_POST, payload: 'удалить пост может только его создатель' })
        }
    }



export const fetchPosts = (groupTitle) => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    const posts = firebase.database().ref(`groups/${groupTitle}/posts`)

    posts.on('value', function (snapshot) {

        dispatch({ type: FETCH_POSTS, payload: snapshot.val() || [] })
    });
};

export const fetchPost = (content) => (dispatch, getState, getFirebase) => {

    const firebase = getFirebase()
    const posts = firebase.database().ref(`groups/${content.groupTitle}/posts`)

    posts.on('value', function (snapshot) {

        dispatch({ type: FETCH_POST, payload: snapshot.val()[content.post] || [] })
    });
};


export const authListener = () => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    firebase.auth().onAuthStateChanged(function (user) {
        if (user && !user.emailVerified) {
            user.sendEmailVerification()
                .then(function () {
                    dispatch({ type: EMAIL_SENDED });
                }).catch(function (error) {
                    dispatch({ type: EMAIL_DISPATCH_ERROR, payload: error });
                });
        }
    });
}


