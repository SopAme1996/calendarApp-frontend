import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const resp = await fetchConToken("events/create", event, "POST");
      const body = await resp.json();

      if (body.status) {
        event.id = body.evento.id;
        event.user = {
          _id: uid,
          name: name,
        };
        dispatch(eventAddNewNote(event));
        Swal.fire("Success", "Evento guardado correctamente", "success");
      } else {
        Swal.fire("Error", "Error al guardar el evento", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartLoad = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("events");
      const body = await resp.json();
      if (body.status) {
        const events = prepareEvents(body.eventos);
        dispatch(loadEvents(events));
      } else {
        Swal.fire("Error", "Error al cargar los eventos", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `events/update/${event.id}`,
        event,
        "PUT"
      );
      const body = await resp.json();

      if (body.status) {
        dispatch(eventsUpdates(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id: eventId } = getState().calendar.activeEvent;
    try {
      const resp = await fetchConToken(
        `events/delete/${eventId}`,
        {},
        "DELETE"
      );
      const body = await resp.json();

      if (body.status) {
        dispatch(enventRemove());
        Swal.fire("Success", "Mensaje eliminado correctamente !!", "success");
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventsUpdates = (event) => {
  return {
    type: types.eventUpdate,
    payload: event,
  };
};

const loadEvents = (events) => {
  return {
    type: types.eventLoad,
    payload: events,
  };
};

export const eventSetActive = (event) => {
  return {
    type: types.eventSetActive,
    payload: event,
  };
};

const eventAddNewNote = (event) => {
  return {
    type: types.eventAddNew,
    payload: event,
  };
};

export const eventRemoveNoteActive = () => {
  return {
    type: types.eventClearNoteActive,
  };
};

export const eventUpdated = (event) => {
  return {
    type: types.eventUpdate,
    payload: event,
  };
};

export const enventRemove = () => {
  return {
    type: types.eventRemove,
  };
};
