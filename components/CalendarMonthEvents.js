import React from 'react'
import { format } from 'date-fns'
import Button from '@material-ui/core/Button'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import InternalLink from './InternalLink'

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
    whiteSpace: 'nowrap'
  }
})

const CalendarMonthEvents = ({ events }) => {
  const classes = useStyles()
  if (!events) return null
  const sliceNumber = events.length > 4 ? 3 : 4
  return (
    <>
      {events.slice(0, sliceNumber).map(event => (
        <Button
          key={event.id}
          href='/event/[id]'
          as={`/event/${event.id}`}
          component={InternalLink}
          onClick={(e) => e.stopPropagation()}
          variant='contained'
          startIcon={<FiberManualRecordIcon color='secondary' style={{ fontSize: 10, marginLeft: 10 }} />}
          classes={{
            root: classes.root,
            label: classes.label
          }}
        >
          {`${format(event.date, 'ha').toLowerCase()} ${event.title}`}
        </Button>
      ))}
      {sliceNumber === 3 &&
        <Button
          onClick={(e) => e.stopPropagation()}
          variant='contained'
          startIcon={<AddIcon style={{ fontSize: 10, marginLeft: 10 }} />}
          classes={{
            root: classes.root,
            label: classes.label
          }}
        >
          {`${events.length - 3} more`}
        </Button>}
    </>
  )
}

export default CalendarMonthEvents
