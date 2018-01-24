import * as TYPES from '../ActionsTYPES/TYPES';

const initialState = {
    pending: false,
    success: false,
    rejected: false,
    userData: null,
    error: null
}

function authReducer(state = initialState, action) {
    switch(action.type) {
        case TYPES.CREATE_ACCOUNT_PENDING: {
            return {
                ...state,
                pending: true
            }
        }
        case TYPES.CREATE_ACCOUT_SUCCESS: {
            return {
                ...state,
                pending: false,
                success: true,
                rejected: false,
                userData: action.payload
            }
        }
        case TYPES.CREATE_ACCOUNT_REJECTED: {
            return {
                ...state,
                pending: false,
                success: false,
                rejected: true,
                error: action.payload
            }
        }
        case TYPES.CREATE_ACCOUNT_TO_INITIAL: {
            return {
                ...state,
                pending: false,
                success: false,
                rejected: false,
                userData: null,
                error: null
            }
        }

        default: {
            return state;
        }
       
    }
}

export default authReducer;

