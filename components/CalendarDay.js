import React, { useState } from 'react'
import { format, isSameHour, eachHourOfInterval, startOfDay, endOfDay, getHours } from 'date-fns'
import Typography from '@mui/material/Typography'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import CalendarDayEvents from './CalendarDayEvents'
import { useQuery } from '@apollo/client'
import { GET_QUOTATIONS_BY_DATE_RANGEV10 } from '../lib/queries/getQuotationsByDateRange'
import { useAuth } from './AuthProvider'
import CalendarCount from './CalendarCount'

const CalendarDay = ({
  currentDate,
  viewDate
}) => {
  const [salesmanFilter, setSalesmanFilter] = useState(() => [])
  const handleSalesmanFilter = (event, newFilter) => {
    setSalesmanFilter(newFilter)
  }
  const { user } = useAuth()
  const start = startOfDay(viewDate)
  const end = endOfDay(viewDate)
  const { loading, error, data } = useQuery(GET_QUOTATIONS_BY_DATE_RANGEV10, { variables: { input: { start, end } } })
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const dayHours = eachHourOfInterval({ start, end })
  const isEven = (x) => !(x & 1)
 const filteredDayList = salesmanFilter.length === 0 ? data.getQuotationsByDateRangeV10 : data.getQuotationsByDateRangeV10.filter(event => salesmanFilter.includes(event.salesRef.name))
 const filteredDayHours = dayHours.map((time, i) => {
    const events = filteredDayList.filter(event => isSameHour(new Date(event.dateDue), time))
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
  if (filteredDayList.length === 0) return <Typography>No Quotes Scheduled</Typography>
  return (
    <>
      <CalendarCount data={data.getQuotationsByDateRangeV10} handleSalesmanFilter={handleSalesmanFilter} salesmanFilter={salesmanFilter} />
      <ImageList rowHeight='auto' cols={23} gap={6}>
        <ImageListItem
          cols={1}
          style={{ border: '1px solid lightgrey', justifyContent: 'center', alignItems: 'flex-end' }}
        >
          <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase', padding: 4, paddingRight: 6 }}>Time</Typography>
        </ImageListItem>
        <ImageListItem
          cols={22}
          style={{
            border: '1px solid lightgrey',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginLeft: 10 }}>
            <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase', marginTop: 4 }}>{format(viewDate, 'EEE')}</Typography>
            <Typography variant='h6' color='textSecondary' style={{ marginTop: -6 }}>{format(viewDate, 'd')}</Typography>
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
                paddingRight: 6,
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
                <CalendarDayEvents events={time.events} showSalesName={user.role !== 'INSIDESALES'} />
              </div>
            </ImageListItem>
          </React.Fragment>
        ))}
      </ImageList>
    </>
  )
}

export default CalendarDay
