import * as TYPES from '../ActionsTYPES/TYPES';

const initialApp = {
	appStatus: false
}

function testReducer(state = initialApp, action) {
		switch(action.type) {
			case TYPES.RUN_THE_APP: {
				return {
					...state, 
					appStatus: action.payload
				}
			}
			default: {
				return state;
			}
		}
}


export default testReducer;