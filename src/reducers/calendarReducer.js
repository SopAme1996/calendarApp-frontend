import { types } from "../types/types";

const initialState = {
  events: [],
  activeEvent: null,
};

const defaultInitState = JSON.parse(JSON.stringify(initialState));

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.eventLoad:
      return {
        ...state,
        events: [...action.payload],
      };

    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case types.eventClearNoteActive:
      return {
        ...state,
        activeEvent: null,
      };

    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };

    case types.eventRemove:
      return {
        ...state,
        events: state.events.filter((e) => e.id !== state.activeEvent.id),
        activeEvent: null,
      };
    case types.resetInitialState:
      return {
        ...defaultInitState,
      };

    default:
      return state;
  }
};
