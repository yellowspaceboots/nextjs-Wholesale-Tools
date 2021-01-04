import React from 'react'
import { compareAsc } from 'date-fns'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import InternalLink from './InternalLink'
import CalendarEventButton from './CalendarEventButton'

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 12,
    height: 18,
    width: '95%',
    overflow: 'hidden',
    marginTop: 4
  },
  plusMoreRoot: {
    fontSize: 12,
    height: 18,
    padding: 0
  },
  label: {
    justifyContent: 'flex-start',
    whiteSpace: 'nowrap'
  }
}))

const CalendarMonthEvents = ({ events, day, dateCount }) => {
  if (!events) return null
  const classes = useStyles()
  const max = dateCount <= 35 ? 4 : 3
  const needsSlicing = events.length > max
  const sliceNumber = needsSlicing ? max - 1 : max
  return (
    <>
      {events.slice().sort((a, b) => compareAsc(new Date(a.dateDue), new Date(b.dateDue))).slice(0, sliceNumber).map(event => (
        <CalendarEventButton key={event._id} event={event} time title fullWidth />
      ))}
      {needsSlicing &&
        <Button
          fullWidth
          component={InternalLink}
          href='/calendar/[...params]'
          as={`/calendar/day/${day.getFullYear()}/${day.getMonth() + 1}/${day.getDate()}`}
          onClick={(e) => e.stopPropagation()}
          variant='contained'
          startIcon={<AddIcon style={{ fontSize: 10, marginLeft: 10, marginRight: -5 }} />}
          classes={{
            root: classes.plusMoreRoot,
            label: classes.label
          }}
        >
          {`${events.length - sliceNumber} more`}
        </Button>}
    </>
  )
}

export default CalendarMonthEvents
