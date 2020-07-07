import React from 'react'
import { format, isSameHour, isSameDay, eachHourOfInterval, startOfDay, endOfDay } from 'date-fns'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
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
  return (
    <>
      <GridList cellHeight='auto' cols={16} style={{ borderRight: '1px solid lightgrey' }}>
        <GridListTile
          cols={2}
          style={{ display: 'flex', border: '1px solid lightgrey', borderRight: 'none', borderBottom: 'none', justifyContent: 'center' }}
        >
          <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase' }}>Time</Typography>
        </GridListTile>
        <GridListTile
          cols={2}
          style={{
            display: 'flex',
            flex: 2,
            border: '1px solid lightgrey',
            borderRight: 'none',
            borderBottom: 'none',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginLeft: 10 }}>
            <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase' }}>{format(viewDate, 'EEE')}</Typography>
            <Typography variant='h6' color='textSecondary'>{format(viewDate, 'd')}</Typography>
          </div>
        </GridListTile>
      </GridList>
      <div style={{ borderBottom: '1px solid lightgrey' }}>
        {dayHours.map((time) => (
          <GridList key={time} cellHeight='auto' cols={16} style={{ borderRight: '1px solid lightgrey' }}>
            <GridListTile
              cols={2}
              style={{ display: 'flex', border: '1px solid lightgrey', borderRight: 'none', borderBottom: 'none', justifyContent: 'center' }}
            >
              <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase' }}>{format(time, 'h a')}</Typography>
            </GridListTile>
            <GridListTile
              cols={14}
              style={{
                display: 'flex',
                border: '1px solid lightgrey',
                borderRight: 'none',
                borderBottom: 'none'
              }}
            >
              <CalendarDayEvents events={dayProjectList.filter(event => isSameHour(new Date(event.dateDue), time))} showSalesName />
            </GridListTile>
          </GridList>
        ))}
      </div>
    </>
  )
}

export default CalendarDay
