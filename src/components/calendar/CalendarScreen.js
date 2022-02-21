import React, { useEffect, useState } from "react";

import { Navbar } from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "../Modal/CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import {
  eventRemoveNoteActive,
  eventSetActive,
  eventStartLoad,
} from "../../actions/events";
import { AddNewNote } from "../ui/AddNewNote";
import { RemoveNote } from "../ui/RemoveNote";

moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const [view, setView] = useState(localStorage.getItem("lastView") || "month");
  const { calendar } = useSelector((state) => state);
  const { uid } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventStartLoad());
  }, [dispatch]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#367CF7" : "#FF5733",
      borderRadius: "10px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };

  const onViewEvent = (e) => {
    setView(e);
    localStorage.setItem("lastView", e);
  };

  const onDoubleClickEvent = () => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onSelectSlot = (e) => {
    dispatch(eventRemoveNoteActive());
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      <section className="calendar-screen">
        <Calendar
          localizer={localizer}
          events={calendar.events}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          eventPropGetter={eventStyleGetter}
          onView={onViewEvent}
          view={view}
          onDoubleClickEvent={onDoubleClickEvent}
          onSelectEvent={onSelectEvent}
          components={{
            event: CalendarEvent,
          }}
          onSelectSlot={onSelectSlot}
          selectable={true}
        />
      </section>

      <CalendarModal />
      <AddNewNote />

      {calendar.activeEvent && <RemoveNote />}
    </>
  );
};
