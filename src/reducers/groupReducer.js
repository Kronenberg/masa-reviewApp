import { 
    GET_ALL_GROUPS_PENDING,
    GET_ALL_GROUPS_SUCCESS,
    GET_ALL_GROUPS_REJECTED
} from '../ActionsTYPES/TYPES';

const initialState = {
    pending: false,
    success: false,
    rejected: false,
    groups: [],
    error: null
}


function groupReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_GROUPS_PENDING: {
            return {
                ...state,
                pending: true
            }
        }
        case GET_ALL_GROUPS_SUCCESS: {
            return {
                ...state,
                success: true,
                pending: false,
                rejected: false,
                groups: action.payload
            }
        }
        case GET_ALL_GROUPS_REJECTED: {
            return {
                ...state,
                pending: false,
                error: action.payload,
                success: false,
                rejected: true
            }
        }

        default: {
            return state;
        }
       
    }


}

export default groupReducer;