import { SAVE_POST, FETCH_POSTS } from '../ActionsTYPES/TYPES'


export const savePost = (post) =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        firebase.database().ref(`groups/${post.groupTitle}/posts/${post.postIndex}`)
            .set(post)
            .then(() => {
                dispatch({ type: SAVE_POST, payload: 'Success' })
            })
            .catch((err) => {
                dispatch({ type: SAVE_POST, payload: err })
            })
    }

export const fetchPosts = () => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    const posts = firebase.database().ref('groups/')

    posts.on('value', function (snapshot) {
        console.log(snapshot.val())
        dispatch({ type: FETCH_POSTS, payload: snapshot.val() || [] })
    });
};