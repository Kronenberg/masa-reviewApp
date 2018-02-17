import * as TYPES from '../ActionsTYPES/TYPES';

const initialState = {
    pending: false,
    success: false,
    rejected: false,
    userData: null,
    error: null,
    login: false,
    emailSended: false,
    emailVerified: false,
    userEmail: null
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
        case TYPES.EMAIL_SENDED: {
            return {
                ...state,
                emailSended: true
            }
        }
        case TYPES.EMAIL_DISPATCH_ERROR: {
            return {
                ...state,
                emailSended: false,
                error: action.payload
            }
        }

        case TYPES.EMAIL_VERIFIED_SUCCESS: {
            return {
                ...state,
                emailVerified: true,
                error: false,
                userEmail: action.payload
            }
        }

        case TYPES.EMAIL_VERIFIED_FAIL: {
            return {
                ...state,
                emailVerified: false
            }
        }

        case TYPES.CREATE_ACCOUNT_TO_INITIAL: {
            return {
                ...state,
                pending: false,
                success: false,
                rejected: false,
                userData: null,
                emailSended: false,
                emailVerified: false,
                error: true,
                userEmail: null
            }
        }

        case TYPES.CREATE_ACCOUNT_TO_INITIAL_ERROR: {

            return {
                ...state,
                error: action.payload
            }
        }
        case TYPES.AUTO_LOGIN_USER: {

            return {
                ...state,
                success: true,
                login: true,
                emailVerified: true,
                userEmail: action.payload
            }
        }
        default: {
            return state;
        }
       
    }
}

export default authReducer;
