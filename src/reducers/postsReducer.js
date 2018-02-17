import {
    FETCH_POSTS,

} from '../ActionsTYPES/TYPES';

const initialState = {}


function postsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS: {
            let postsList = [];

            if (!action.payload) {
                console.log('posts list is empty')
            } else {
                for (var key in action.payload) {
                    if (action.payload.hasOwnProperty(key)) {
                        postsList.push(action.payload[key])
                    }
                }
            }
            return postsList
        }

        default: {
            return state;
        }

    }


}

export default postsReducer;