import React from 'react';

import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const my_list_events = {
        title: "Cumpleaños del jefe",
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',


    }
    return (
        <>
            <header>
                <Navbar />
            </header>

            <section>
                <Calendar
                    localizer={localizer}
                    events={my_list_events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </section>
        </>
    )
}
