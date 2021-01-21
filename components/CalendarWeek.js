import React, { useState } from 'react'
import { format, startOfWeek, endOfWeek, eachDayOfInterval, eachHourOfInterval, startOfDay, endOfDay, isSameWeek, isSameHour, getHours } from 'date-fns'
import Typography from '@material-ui/core/Typography'
import ImageList from '@material-ui/core/ImageList'
import ImageListItem from '@material-ui/core/ImageListItem'
import CalendarDayEvents from './CalendarDayEvents'
import { useQuery } from '@apollo/client'
import { GET_QUOTATIONS_BY_DATE_RANGE } from '../testApi/queries/getQuotationsByDateRange'
import { useAuth } from './AuthProvider'
import CalendarCount from './CalendarCount'

const CalendarWeek = ({
  currentDate,
  viewDate
}) => {
  const [salesmanFilter, setSalesmanFilter] = useState(() => [])
  const handleSalesmanFilter = (event, newFilter) => {
    setSalesmanFilter(newFilter)
  }
  const { user } = useAuth()
  const start = startOfWeek(viewDate)
  const end = endOfWeek(viewDate)
  const { loading, error, data } = useQuery(GET_QUOTATIONS_BY_DATE_RANGE, { variables: { input: { start, end } } })
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const dayHours = eachHourOfInterval({
    start: startOfDay(viewDate),
    end: endOfDay(viewDate)
  })
  const weekProjectList = data.getQuotationsByDateRange.data.filter(event => isSameWeek(new Date(event.dateDue), viewDate))
  const filteredWeekProjectList = salesmanFilter.length === 0 ? weekProjectList : weekProjectList.filter(event => salesmanFilter.includes(event.salesRef.name))
  const weekdayData = eachDayOfInterval({ start: startOfWeek(viewDate), end: endOfWeek(viewDate) })
  const isEven = (x) => !(x & 1)
  const filteredDayHours = dayHours.map((time) => {
    const dayEvents = weekdayData.map((day, i) => {
      const events = filteredWeekProjectList.filter(event =>
        isSameHour(new Date(event.dateDue),
          new Date(
            day.getFullYear(),
            day.getMonth(),
            day.getDate(),
            time.getHours(),
            time.getMinutes(),
            time.getSeconds(),
            time.getMilliseconds()
          )
        )
      )
      const eventCount = events.length
      return (
        {
          day,
          events,
          eventCount
        }
      )
    })
    const hourEventCount = dayEvents.reduce((acc, curr) => acc + curr.eventCount, 0)
    return {
      time,
      formattedTime: format(time, 'h a'),
      hourEventCount,
      dayEvents,
      striped: isEven(getHours(time))
    }
  })
  const lowerBounds = filteredDayHours.findIndex(val => val.hourEventCount > 0 || val.hourEventCount > 0)
  const upperBounds = filteredDayHours.slice().reverse().findIndex(val => val.hourEventCount > 0 || val.hourEventCount > 0)
  return (
    <>
      <CalendarCount data={data.getQuotationsByDateRange.data} handleSalesmanFilter={handleSalesmanFilter} salesmanFilter={salesmanFilter} />
      <ImageList rowHeight='auto' cols={8} gap={2} style={{ maxWidth: '100%' }}>
        <ImageListItem
          cols={1}
          style={{ display: 'flex', border: '1px solid lightgrey', justifyContent: 'center', alignItems: 'flex-end' }}
        >
          <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase', padding: 4, paddingRight: 6 }}>Time</Typography>
        </ImageListItem>
        {weekdayData.map((day, i) => (
          <ImageListItem
            key={day}
            cols={1}
            style={{
              display: 'flex',
              border: '1px solid lightgrey',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: (i === 0 || i === 6) ? 'none' : 275,
              minWidth: (i === 0 || i === 6) ? 'none' : 275
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase', marginTop: 4 }}>{format(day, 'EEE')}</Typography>
              <Typography variant='h6' color='textSecondary' style={{ marginTop: -6 }}>{format(day, 'd')}</Typography>
            </div>
          </ImageListItem>
        ))}
        {filteredDayHours.slice(lowerBounds, filteredDayHours.length - upperBounds).map(time => (
          <React.Fragment key={time.time}>
            <ImageListItem
              cols={1}
              style={{
                display: 'flex',
                border: '1px solid lightgrey',
                justifyContent: 'center',
                alignItems: 'flex-end',
                backgroundColor: time.striped ? 'whitesmoke' : 'transparent'
              }}
            >
              <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase', padding: 4 }}>{time.formattedTime}</Typography>
            </ImageListItem>
            {time.dayEvents.map((day, i) => {
              return (
                <ImageListItem
                  key={day.day}
                  cols={1}
                  style={{
                    display: 'flex',
                    border: '1px solid lightgrey',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    padding: 4,
                    paddingRight: 6,
                    overflow: 'hidden',
                    backgroundColor: time.striped ? 'whitesmoke' : 'transparent'
                  }}
                >
                  <CalendarDayEvents
                    fullWidth
                    events={day.events}
                    wrap
                    showSalesName={user.role !== 'INSIDESALES'}
                  />
                </ImageListItem>
              )
            })}
          </React.Fragment>
        ))}
      </ImageList>
    </>
  )
}

export default CalendarWeek
