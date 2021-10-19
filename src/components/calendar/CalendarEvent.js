import React from 'react'

export const CalendarEvent = ({ event }) => {
    const { title, user } = event;

    return (
        <div className='event-note'>
            <strong>{title}</strong>
            <br />
            <span> by {user.name}</span>
        </div>
    )
}
