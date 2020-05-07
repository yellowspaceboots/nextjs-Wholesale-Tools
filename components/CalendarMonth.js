import React, { useState } from 'react'
import { isSameMonth, isSameDay, format } from 'date-fns'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Popper from '@material-ui/core/Popper'
import InternalLink from './InternalLink'
import AddToCalendar from './AddToCalendar'
import Button from '@material-ui/core/Button'
import CalendarMonthEvents from './CalendarMonthEvents'

const CalendarMonth = ({
  weekdays,
  calendarDates,
  monthStart,
  currentDate,
  selectedDate,
  setSelectedDate,
  events
}) => {
  const dateFormat = 'd'
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleClick = () => (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(!open)
  }
  const handleClickOpen = (day) => {
    setDialogOpen(true)
    setSelectedDate(day)
  }
  console.log(selectedDate)
  return (
    <>
      <GridList cellHeight='auto' cols={7} style={{ borderRight: '1px solid lightgrey' }}>
        {weekdays.map((day) => (
          <GridListTile
            key={day}
            cols={1}
            style={{ display: 'flex', border: '1px solid lightgrey', borderRight: 'none', borderBottom: 'none', justifyContent: 'center' }}
          >
            <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase' }}>{day}</Typography>
          </GridListTile>
        ))}
      </GridList>
      <GridList cellHeight={120} cols={7} style={{ borderRight: '1px solid lightgrey', borderBottom: '1px solid lightgrey' }}>
        {calendarDates.map((day) => (
          <GridListTile
            key={day.valueOf()}
            cols={1}
            style={{
              backgroundColor: !isSameMonth(day, monthStart) ? '#ebebeb' : 'transparent',
              border: '1px solid lightgrey',
              borderRight: 'none',
              borderBottom: 'none',
              textAlign: 'center'
            }}
            onClick={() => handleClickOpen(day)}
          >
            <IconButton
              color='inherit'
              size='small'
              aria-label='Previous'
              href='/calendar/[...params]'
              as={`/calendar/day/${day.getFullYear()}/${day.getMonth() + 1}/${day.getDate()}`}
              component={InternalLink}
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: isSameDay(day, currentDate) && '#1e3f76', width: format(day, dateFormat) !== '1' && 24, height: format(day, dateFormat) !== '1' && 24 }}
            >
              <Typography variant='caption' style={{ color: isSameDay(day, currentDate) && 'white' }}>
                {format(day, dateFormat) === '1' ? format(day, 'MMM d') : format(day, dateFormat)}
              </Typography>
            </IconButton>
            <CalendarMonthEvents events={events[`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`]} />
          </GridListTile>
        ))}
      </GridList>
      <AddToCalendar open={dialogOpen} setOpen={setDialogOpen} setSelectedDate={setSelectedDate} />
    </>
  )
}

export default CalendarMonth
