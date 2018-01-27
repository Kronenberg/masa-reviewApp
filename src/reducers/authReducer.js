import * as TYPES from '../ActionsTYPES/TYPES';

const initialState = {
    pending: false,
    success: false,
    rejected: false,
    userData: null,
    error: null,
    login: false,
    emailVerified: false
}

function authReducer(state = initialState, action) {
    switch(action.type) {
        case TYPES.CREATE_ACCOUNT_PENDING: {
            
            return {
                ...state,
                pending: true
            }
        }
    
        case TYPES.CREATE_ACCOUNT_SUCCESS: {
            return {
                ...state,
                pending: false,
                success: true,
                rejected: false,
                userData: action.payload,
                error: false
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
                error: true
            }
        }
        case TYPES.LOGIN_ACCOUNT_PENDING: {
            return {
                ...state,
                pending: true
            }
        }
        case TYPES.LOGIN_ACCOUNT_SUCCESS: {
            return {
                ...state,
                pending: false,
                success: true,
                rejected: false,
                userData: action.payload,
                login: true,
                error: false
            }
        }
        case TYPES.LOGIN_ACCOUNT_REJECTED: {
            return {
                ...state,
                pending: false,
                error: action.payload
            }
        }

        case TYPES.EMAIL_VERIFIED_SUCCESS: {
            return {
                ...state,
                emailVerified: true,
                error: false
            }
        }

        case TYPES.EMAIL_VERIFIED_FAIL: {
            return {
                ...state,
                emailVerified: false
            }
        }



        case TYPES.CREATE_ACCOUNT_TO_INITIAL_ERROR: {

            return {
                ...state,
                error: action.payload
            }
        }

        default: {
            return state;
        }
       
    }
}

export default authReducer;
