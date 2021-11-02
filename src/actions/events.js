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

export const eventRemoveNoteActive = () => {
    return {
        type: types.eventClearNoteActive,
    }
}

export const eventUpdated = (event) => {
    return {
        type: types.eventUpdate,
        payload: event,
    }
}

export const enventRemove = () => {
    return {
        type: types.eventRemove
    }
}