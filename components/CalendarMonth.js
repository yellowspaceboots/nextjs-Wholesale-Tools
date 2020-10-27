import React from 'react'
import { isSameMonth, isSameDay, format, startOfDay, endOfDay } from 'date-fns'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ImageList from '@material-ui/core/ImageList'
import ImageListItem from '@material-ui/core/ImageListItem'
import InternalLink from './InternalLink'
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
  const handleClickOpen = (day) => setSelectedDate(day)
  const firstDate = startOfDay(calendarDates[0]).toISOString()
  const lastDate = endOfDay(calendarDates[calendarDates.length - 1]).toISOString()
  console.log({ firstDate, lastDate })
  return (
    <ImageList rowHeight='auto' cols={7} gap={2}>
      <>
        {weekdays.map((day) => (
          <ImageListItem
            key={day}
            cols={1}
            style={{ border: '1px solid lightgrey', justifyContent: 'center' }}
          >
            <Typography variant='caption' align='center' color='textSecondary' style={{ textTransform: 'uppercase' }}>{day}</Typography>
          </ImageListItem>
        ))}
        {calendarDates.map((day) => (
          <ImageListItem
            key={day.valueOf()}
            cols={1}
            style={{
              backgroundColor: !isSameMonth(day, monthStart) ? 'whitesmoke' : 'transparent',
              border: '1px solid lightgrey',
              alignItems: 'center',
              height: calendarDates.length <= 35 ? 132 : 110,
              paddingLeft: 8,
              paddingRight: 8
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
              style={{ backgroundColor: isSameDay(day, currentDate) && '#1e3f76', width: format(day, dateFormat) !== '1' && 24, height: format(day, dateFormat) !== '1' && 24, marginTop: 4, marginBottom: 4 }}
            >
              <Typography variant='caption' style={{ color: isSameDay(day, currentDate) && 'white' }}>
                {format(day, dateFormat) === '1' ? format(day, 'MMM d') : format(day, dateFormat)}
              </Typography>
            </IconButton>
            <div style={{ maxWidth: 275 }}>
              <CalendarMonthEvents events={events[`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`]} day={day} dateCount={calendarDates.length} />
            </div>
          </ImageListItem>
        ))}
      </>
    </ImageList>
  )
}

export default CalendarMonth
