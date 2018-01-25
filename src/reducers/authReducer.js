import * as TYPES from '../ActionsTYPES/TYPES';

const initialState = {
    pending: false,
    success: false,
    rejected: false,
    emailSended: false,
    userData: null,
    error: null,
    login: false
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
                userData: action.payload
            }
        }
        case TYPES.EMAIL_VERIFIED_SENDED: {
            return {
                ...state,
                pending: false,
                success: true,
                rejected: false,
                emailSended: true,
                userData: action.payload
            }
        }
        case TYPES.EMAIL_VERIFIED_ERROR: {
            return {
                ...state,
                pending: false,
                success: false,
                rejected: false,
                error: action.payload
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
                login: true
            }
        }
        case TYPES.LOGIN_ACCOUNT_REJECTED: {
            return {
                ...state,
                pending: false,
                success: false,
                rejected: true,
                userData: action.payload,
                login: false
            }
        }

        default: {
            return state;
        }
       
    }
}

export default authReducer;

