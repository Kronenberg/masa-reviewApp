import * as TYPES from '../ActionsTypes/TYPES';

export function runTheApp() {
	return {
		type: TYPES.RUN_THE_APP,
		payload: true
	}
}

export default {
	runTheApp
}