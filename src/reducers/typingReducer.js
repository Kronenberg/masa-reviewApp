import {
  WHO_IS_TYPING_GET_USER,
  WHO_IS_TYPING_SET_USER
} from '../ActionsTYPES/TYPES';

const initialState = {
  pending: false,
  setUser: null,
  getUser: null
}


function whoIsTypignReducer(state = initialState, action) {
  switch (action.type) {
    case WHO_IS_TYPING_GET_USER: {
      return {
        ...state,
        pending: false,
        getUser: action.payload
      }
    }
    case WHO_IS_TYPING_SET_USER: {
      return {
        ...state,
        pending: true,
        setUser: action.payload
      }
    }
    default: {
      return state;
    }

  }


}

export default whoIsTypignReducer;