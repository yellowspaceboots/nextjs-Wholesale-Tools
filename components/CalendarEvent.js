import React from 'react'
import Typography from '@material-ui/core/Typography'
import { eventData } from '../api/mock'

const CalendarEvent = ({ id }) => {
  const event = eventData.find(event => String(event.id) === String(id))
  console.log(event)
  return (
    <>
      <Typography>Calendar Event : {event.title}</Typography>
      <Typography>{id}</Typography>
    </>
  )
}

export default CalendarEvent
