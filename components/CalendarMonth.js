import React from 'react'
import { isSameMonth, isSameDay, format, startOfDay, endOfDay, getDay } from 'date-fns'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ImageList from '@material-ui/core/ImageList'
import ImageListItem from '@material-ui/core/ImageListItem'
import InternalLink from './InternalLink'
import CalendarMonthEvents from './CalendarMonthEvents'
import { useQuery } from '@apollo/client'
import { GET_QUOTATIONS_BY_DATE_RANGE } from '../testApi/queries/getQuotationsByDateRange'
import CircularProgress from '@material-ui/core/CircularProgress'

const CalendarMonth = ({
  weekdays,
  calendarDates,
  monthStart,
  currentDate,
  selectedDate,
  setSelectedDate
}) => {
  const dateFormat = 'd'
  const handleClickOpen = (day) => setSelectedDate(day)
  const start = startOfDay(calendarDates[0]).toISOString()
  const end = endOfDay(calendarDates[calendarDates.length - 1]).toISOString()
  const { loading, error, data } = useQuery(GET_QUOTATIONS_BY_DATE_RANGE, { variables: { input: { start, end } } })
  if (loading) {
    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    )
  }
  if (error) return `Error! ${error.message}`
  const calendarDatesWithQuotations = calendarDates.map(day => {
    return {
      day,
      quotations: data.getQuotationsByDateRange.data.filter(quote => isSameDay(day, new Date(quote.dateDue)))
    }
  })
  return (
    <ImageList rowHeight='auto' cols={7} gap={2} style={{ maxWidth: '100%' }}>
      <>
        {weekdays.map((day, i) => (
          <ImageListItem
            key={day}
            cols={1}
            style={{ border: '1px solid lightgrey', justifyContent: 'center' }}
          >
            <Typography variant='caption' align='center' color='textSecondary' style={{ textTransform: 'uppercase' }}>{day}</Typography>
          </ImageListItem>
        ))}
        {calendarDatesWithQuotations.map((day, i) => (
          <ImageListItem
            key={day.day.valueOf()}
            cols={1}
            style={{
              backgroundColor: !isSameMonth(day.day, monthStart) ? 'whitesmoke' : 'transparent',
              border: '1px solid lightgrey',
              alignItems: 'center',
              height: calendarDates.length <= 35 ? 132 : 110,
              paddingLeft: 8,
              paddingRight: 8
            }}
            onClick={() => handleClickOpen(day.day)}
          >
            <IconButton
              color='inherit'
              size='small'
              aria-label='Previous'
              href='/calendar/[...params]'
              as={`/calendar/day/${day.day.getFullYear()}/${day.day.getMonth() + 1}/${day.day.getDate()}`}
              component={InternalLink}
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: isSameDay(day.day, currentDate) && '#1e3f76', width: format(day.day, dateFormat) !== '1' && 24, height: format(day.day, dateFormat) !== '1' && 24, marginTop: 4, marginBottom: 4 }}
            >
              <Typography variant='caption' style={{ color: isSameDay(day.day, currentDate) && 'white' }}>
                {format(day.day, dateFormat) === '1' ? format(day.day, 'MMM d') : format(day.day, dateFormat)}
              </Typography>
            </IconButton>
            {(getDay(day.day) === 0 || getDay(day.day) === 6)
              ? (
                <div>
                  <CalendarMonthEvents events={day.quotations} day={day.day} dateCount={calendarDates.length} />
                </div>
                )
              : (
                <div style={{ maxWidth: 275, minWidth: 275 }}>
                  <CalendarMonthEvents events={day.quotations} day={day.day} dateCount={calendarDates.length} />
                </div>
                )}

          </ImageListItem>
        ))}
      </>
    </ImageList>
  )
}

export default CalendarMonth
