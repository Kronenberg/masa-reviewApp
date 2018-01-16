import * as TYPES from '../ActionsTYPES/TYPES';

export function runTheApp() {
	return {
		type: TYPES.RUN_THE_APP,
		payload: true
	}
}


export default {
	runTheApp
}