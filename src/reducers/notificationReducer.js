import * as TYPES from '../ActionsTYPES/TYPES';


function notificationReducer(state = {}, action) {
    switch (action.type) {
        case TYPES.MESSAGE_SAVED: {
            return {
                [action.type]: action.payload
            }
        }
        case TYPES.COMMENT_SAVED: {
            return { 
                [action.type]: action.payload 
            }
        }

        default: {
            return state
        }

    }
}

export default notificationReducer;