import React from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay
} from 'date-fns'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ImageList from '@material-ui/core/ImageList'
import ImageListItem from '@material-ui/core/ImageListItem'
import Grid from '@material-ui/core/Grid'
import InternalLink from './InternalLink'

const CalendarYear = ({ months, year, shortWeekdays, currentDate }) => {
  const monthData = months.map((month, i) => {
    const monthStart = startOfMonth(new Date(year, i, 1, 0, 0, 0))
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    const calendarDates = eachDayOfInterval({ start: startDate, end: endDate })
    return {
      name: month,
      number: i,
      year: startDate.getFullYear(),
      month: startDate.getMonth() + 2,
      days: calendarDates
    }
  })
  return (
    <Grid container justifyContent='space-between' style={{ marginTop: -10, maxWidth: 1200 }}>
      {monthData.map((month) => (
        <div
          key={month.name}
          style={{ display: 'flex', justifyContent: 'center', padding: 10, paddingRight: 20 }}
        >
          <div style={{ width: 250 }}>
            <Typography
              variant='subtitle2'
              color='textSecondary'
              gutterBottom
              style={{ marginLeft: 8 }}
              href='/calendar/[...params]'
              as={`/calendar/month/${month.year}/${month.month}/1`}
              component={InternalLink}
              onClick={(e) => e.stopPropagation()}
            >
              {month.name}
            </Typography>
            <ImageList rowHeight={26} cols={7} gap={4}>
              {shortWeekdays.map((day, i) => (
                <ImageListItem
                  key={i}
                  cols={1}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <Typography variant='overline' color='textSecondary'>{day}</Typography>
                </ImageListItem>
              ))}
              {month.days.map((day, i) => (
                <ImageListItem
                  key={i}
                  cols={1}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <div>
                    <IconButton
                      color='inherit'
                      size='small'
                      href='/calendar/[...params]'
                      as={`/calendar/day/${day.getFullYear()}/${day.getMonth() + 1}/${day.getDate()}`}
                      component={InternalLink}
                      onClick={(e) => e.stopPropagation()}
                      style={{ backgroundColor: (day.getMonth() === month.number && isSameDay(day, currentDate)) && '#1e3f76' }}
                    >
                      <Typography
                        variant='overline'
                        style={{
                          height: 24,
                          minWidth: 20,
                          marginTop: -4,
                          color: (day.getMonth() === month.number && isSameDay(day, currentDate)) && 'white'
                        }}
                      >
                        {format(day, 'd')}
                      </Typography>
                    </IconButton>
                  </div>
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </div>
      ))}
    </Grid>
  )
}

export default CalendarYear
