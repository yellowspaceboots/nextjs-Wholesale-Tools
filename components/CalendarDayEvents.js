import React from 'react'
import { format, compareAsc } from 'date-fns'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import InternalLink from './InternalLink'
import Status from './Status'

const useStyles = makeStyles({
  root: {
    textTransform: 'none',
    fontSize: 12,
    height: 18,
    padding: 0,
    paddingRight: 12,
    marginLeft: 4,
    textAlign: 'left',
    fontWeight: 'lighter',
    backgroundColor: 'white',
    marginTop: 4,
    marginBottom: 4
  },
  label: {
    justifyContent: 'flex-start',
    whiteSpace: 'nowrap'
  }
})

const CalendarDayEvents = ({ events, showSalesName, fullWidth }) => {
  const classes = useStyles()
  if (!events) return null
  return (
    <>
      {events.slice().sort((a, b) => compareAsc(new Date(a.dateDue), new Date(b.dateDue))).map(event => (
        <Button
          key={event._id}
          href='/event/[id]'
          as={`/event/${event._id}`}
          fullWidth={fullWidth}
          component={InternalLink}
          onClick={(e) => e.stopPropagation()}
          variant='contained'
          startIcon={<Status status={event.status} style={{ marginLeft: 10 }} />}
          classes={{
            root: classes.root,
            label: classes.label
          }}
        >
          {`${format(new Date(event.dateDue), 'ha').toLowerCase()} ${event.title}`} {showSalesName && ` - ${event.salesRef.name}`}
        </Button>
      ))}
    </>
  )
}

export default CalendarDayEvents
