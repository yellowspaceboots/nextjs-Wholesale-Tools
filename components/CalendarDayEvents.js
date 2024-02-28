import React from 'react'
import { compareAsc } from 'date-fns'
import CalendarEventButton from './CalendarEventButton'

const CalendarDayEvents = ({ events, wrap, showSalesName, fullWidth }) => {
  if (!events) return null
  return (
    <>
      {events.slice().sort((a, b) => compareAsc(new Date(a.dateDue), new Date(b.dateDue))).map(event => (
        <CalendarEventButton key={event.id} event={event} title salesman={showSalesName} wrap fullWidth={fullWidth} />
      ))}
    </>
  )
}

export default CalendarDayEvents
