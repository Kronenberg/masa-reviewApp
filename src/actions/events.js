import { SAVE_POST, DELETE_POST, FETCH_POSTS, EMAIL_SENDED, EMAIL_DISPATCH_ERROR } from '../ActionsTYPES/TYPES'


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

export const deletePost = (postId, groupTitle, userEmail) =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()

        const user = firebase.auth().currentUser;

        if (user && user.email === userEmail){
            firebase.database().ref(`groups/${groupTitle}/posts/${postId}`)
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

