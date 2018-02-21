import {
    FETCH_EVENTS,
} from '../ActionsTYPES/TYPES';

const initialState = []


function postsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_EVENTS: {
            let eventsList = [];

            if (!action.payload) {
                console.log('events list is empty')
            } else {
                for (var key in action.payload) {
                    if (action.payload.hasOwnProperty(key)) {
                        const event = action.payload[key]

                        const start = event.start.split("-")
                        const end = event.end.split("-")
                        const startTime = event.startTime.split(":")
                        const endTime = event.endTime.split(":")

                        event.start = new Date(Number(start[0]), Number(start[1]) - 1, Number(start[2]), Number(startTime[0]), Number(startTime[1]), 0)
                        event.end = new Date(Number(end[0]), Number(end[1])- 1, Number(end[2]), Number(endTime[0]), Number(endTime[1]), 0)
                        eventsList.push(event)
                    }
                }
            }
            return eventsList
        }

        default: {
            return state;
        }

    }


}

export default postsReducer;