import * as TYPES from '../ActionsTYPES/TYPES';
 

function messagesReducer(state = [], action){
    switch(action.type){
        case TYPES.FETCH_MESSAGES: {
            return [...action.payload]
        }

        default: {
            return state
        }

    }
}

export default messagesReducer;