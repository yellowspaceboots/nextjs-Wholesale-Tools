import React from 'react'
import { format, isSameHour, isSameDay, eachHourOfInterval, startOfDay, endOfDay, getHours } from 'date-fns'
import Typography from '@material-ui/core/Typography'
import ImageList from '@material-ui/core/ImageList'
import ImageListItem from '@material-ui/core/ImageListItem'
import CalendarDayEvents from './CalendarDayEvents'

const CalendarDay = ({
  currentDate,
  viewDate,
  projectList
}) => {
  const dayHours = eachHourOfInterval({
    start: startOfDay(viewDate),
    end: endOfDay(viewDate)
  })
  const dayProjectList = projectList.filter(event => isSameDay(new Date(event.dateDue), viewDate))
  const isEven = (x) => !(x & 1)
  const filteredDayHours = dayHours.map((time, i) => {
    const events = dayProjectList.filter(event => isSameHour(new Date(event.dateDue), time))
    return {
      time,
      formattedTime: format(time, 'h a'),
      events,
      eventsCount: events.length,
      striped: isEven(getHours(time))
    }
  })
  const lowerBounds = filteredDayHours.findIndex(val => val.eventsCount > 0 || val.eventsCount > 0)
  const upperBounds = filteredDayHours.slice().reverse().findIndex(val => val.eventsCount > 0 || val.eventsCount > 0)
  return (
    <ImageList rowHeight='auto' cols={23} gap={6}>
      <ImageListItem
        cols={1}
        style={{ borderRight: '1px solid lightgrey', borderBottom: '1px solid lightgrey', justifyContent: 'center', alignItems: 'flex-end' }}
      >
        <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase', padding: 4 }}>Time</Typography>
      </ImageListItem>
      <ImageListItem
        cols={22}
        style={{
          borderLeft: '1px solid lightgrey',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderBottom: '1px solid lightgrey'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginLeft: 10 }}>
          <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase' }}>{format(viewDate, 'EEE')}</Typography>
          <Typography variant='h6' color='textSecondary'>{format(viewDate, 'd')}</Typography>
        </div>
      </ImageListItem>
      {filteredDayHours.slice(lowerBounds, filteredDayHours.length - upperBounds).map(time => (
        <React.Fragment key={time.time}>
          <ImageListItem
            cols={1}
            style={{
              display: 'flex',
              border: '1px solid lightgrey',
              justifyContent: 'center',
              padding: 4,
              alignItems: 'flex-end',
              backgroundColor: time.striped ? 'whitesmoke' : 'transparent'
            }}
          >
            <Typography variant='caption' noWrap color='textSecondary' style={{ textTransform: 'uppercase' }}>{time.formattedTime}</Typography>
          </ImageListItem>
          <ImageListItem
            cols={22}
            style={{
              border: '1px solid lightgrey',
              padding: 4,
              backgroundColor: time.striped ? 'whitesmoke' : 'transparent'
            }}
          >
            <div>
              <CalendarDayEvents events={time.events} showSalesName />
            </div>
          </ImageListItem>
        </React.Fragment>
      ))}
      {/* dayHours.map((time, i) => (
          <React.Fragment key={time}>
            <ImageListItem
              cols={1}
              style={{ display: 'flex', border: '1px solid lightgrey', justifyContent: 'center', padding: 4, alignItems: 'flex-end' }}
            >
              <Typography variant='caption' noWrap color='textSecondary' style={{ textTransform: 'uppercase' }}>{format(time, 'h a')}</Typography>
            </ImageListItem>
            <ImageListItem
              cols={22}
              style={{
                border: '1px solid lightgrey',
                padding: 4
              }}
            >
              <div>
                <CalendarDayEvents events={dayProjectList.filter(event => isSameHour(new Date(event.dateDue), time))} showSalesName />
              </div>
            </ImageListItem>
          </React.Fragment>
        )) */}
    </ImageList>
  )
}

export default CalendarDay
