import { types } from "../types/types";

export const eventSetActive = (event) => {
    return {
        type: types.eventSetActive,
        payload: event
    }
}

export const eventAddNewNote = (event) => {
    return {
        type: types.eventAddNew,
        payload: event
    }
}