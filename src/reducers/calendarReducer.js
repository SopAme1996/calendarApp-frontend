import { types } from "../types/types";


const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload,
                ]
            }


        default:
            return state;
    }
}