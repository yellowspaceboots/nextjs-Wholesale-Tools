import React from 'react'
import { format, compareAsc } from 'date-fns'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import InternalLink from './InternalLink'
import Status from './Status'
import CalendarEventButton from './CalendarEventButton'

/*

const useStyles = makeStyles({
  root: {
    textTransform: 'none',
    fontSize: 12,
    height: 18,
    padding: 0,
    textAlign: 'left',
    fontWeight: 'lighter',
    backgroundColor: 'white',
    width: '95%',
    marginTop: 4
  },
  label: {
    justifyContent: 'flex-start',
    whiteSpace: 'nowrap',
    color: 'black'
  }
})
        <Button
          key={event._id}
          href='/event/[id]'
          as={`/event/${event._id}`}
          component={InternalLink}
          onClick={(e) => e.stopPropagation()}
          variant='contained'
          startIcon={<Status status={event.status} style={{ marginLeft: 10 }} />}
          classes={{
            root: classes.root,
            label: classes.label
          }}
        >
          {`${format(new Date(event.dateDue), 'ha').toLowerCase()} ${event.title}`}
        </Button>
*/

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

const CalendarMonthEvents = ({ events, day }) => {
  if (!events) return null
  const classes = useStyles()
  const sliceNumber = events.length > 4 ? 3 : 4
  return (
    <>
      {events.slice().sort((a, b) => compareAsc(new Date(a.dateDue), new Date(b.dateDue))).slice(0, sliceNumber).map(event => (
        <CalendarEventButton key={event._id} event={event} time title fullWidth />
      ))}
      {sliceNumber === 3 &&
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
          {`${events.length - 3} more`}
        </Button>}
    </>
  )
}

export default CalendarMonthEvents
