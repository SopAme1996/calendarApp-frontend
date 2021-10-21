import React, { useState } from 'react';

import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from '../Modal/CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';


moment.locale('es');

const localizer = momentLocalizer(moment);

// const my_list_events = [{
//     title: "Cumpleaños del jefe",
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     user: {
//         _id: 1,
//         name: "Luis Solis"
//     }
// }]

export const CalendarScreen = () => {
    const [view, setView] = useState(localStorage.getItem('lastView') || 'month');
    const { calendar } = useSelector(state => state);

    const dispatch = useDispatch();

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '10px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }

    const onViewEvent = (e) => {
        setView(e);
        localStorage.setItem('lastView', e);
    }

    const onDoubleClickEvent = () => {
        dispatch(uiOpenModal());
    }


    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    return (
        <>
            <header>
                <Navbar />
            </header>

            <section className='calendar-screen'>
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
                        event: CalendarEvent
                    }}
                />
            </section>

            <CalendarModal />
        </>
    )
}
