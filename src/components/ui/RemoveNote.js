import React from "react";

import { useDispatch } from "react-redux";
import { eventStartDelete } from "../../actions/events";

export const RemoveNote = () => {
  const dispatch = useDispatch();

  const handleRemoveEvent = () => {
    dispatch(eventStartDelete());
  };

  return (
    <button className="btn btn-danger fab_remove" onClick={handleRemoveEvent}>
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
