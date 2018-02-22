import {
    FETCH_MESSAGES,
} from '../ActionsTYPES/TYPES';

const initialState = [];

function messagesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MESSAGES: {
            let messageList = [];
            console.log(action.payload)
            if (!action.payload) {
                console.log('message list is empty')
            } else {
                for (var key in action.payload) {
                    if (action.payload.hasOwnProperty(key)) {
                        messageList.push(action.payload[key])
                    }
                }
            }
            return messageList
        }
        default: {
            return state;
        }

    }


}

export default messagesReducer;