import React from 'react'
import { compareAsc } from 'date-fns'
import CalendarEventButton from './CalendarEventButton'

const CalendarDayEvents = ({ events, showSalesName, fullWidth }) => {
  if (!events) return null
  return (
    <>
      {events.slice().sort((a, b) => compareAsc(new Date(a.dateDue), new Date(b.dateDue))).map(event => (
        <CalendarEventButton key={event._id} event={event} title salesman />
      ))}
    </>
  )
}

export default CalendarDayEvents
