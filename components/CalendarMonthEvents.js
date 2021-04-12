import React from 'react'
import { compareAsc } from 'date-fns'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import CalendarEventButton from './CalendarEventButton'
import { NextLinkComposed } from './Link'

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
        <CalendarEventButton key={event._id} event={event} time title fullWidth wrap={false} />
      ))}
      {needsSlicing &&
        <Button
          fullWidth
          noWrap
          to={{ pathname: `/calendar/day/${day.getFullYear()}/${day.getMonth() + 1}/${day.getDate()}` }}
          component={NextLinkComposed}
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
