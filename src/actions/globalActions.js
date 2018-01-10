import * as TYPES from '../ActionsTYPES/TYPES';

export function runTheApp() {
	return {
		type: TYPES.RUN_THE_APP,
		payload: true
	}
}

export const dispatchMessages = (message) =>(dispatch, getState, getFirebase) => {
		const firebase = getFirebase()
		firebase.database().ref('messages/' + message.index).set({
			message: message.value,
			index: message.index
		});
};


export const dispatchComments = (comment) => (dispatch, getState, getFirebase) => {
	const firebase = getFirebase()
	firebase.database().ref(`messages/${comment.index}/comments`)
		.push(comment)
};

export const fetchMessages = () => (dispatch, getState, getFirebase) => {
	const firebase = getFirebase()
	const messages = firebase.database().ref('messages/')

	messages.on('value', function (snapshot) {
		console.log(snapshot.val())
		dispatch({ type:TYPES.FETCH_MESSAGES, payload: snapshot.val() || []})
	});
};