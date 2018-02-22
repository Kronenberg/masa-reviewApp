import {
    FETCH_POSTS,
    FETCH_POST
} from '../ActionsTYPES/TYPES';

const initialState = []


function postsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS: {
            let postsList = [];

            if (!action.payload) {
                console.log('posts list is empty')
            } else {
                for (var key in action.payload) {
                    if (action.payload.hasOwnProperty(key)) {
                        action.payload[key].postId = key

                        if (action.payload[key].comments){
                            action.payload[key].commentsCount = Object.keys(action.payload[key].comments).length;
                        }else{
                            action.payload[key].commentsCount = 0;
                        }
                        postsList.push(action.payload[key])
                    }
                }
            }
            return postsList
        }

        case FETCH_POST: {

            return action.payload
        }

        default: {
            return state;
        }

    }


}

export default postsReducer;