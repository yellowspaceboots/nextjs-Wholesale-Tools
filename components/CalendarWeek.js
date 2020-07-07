import React from 'react'
import { format, startOfWeek, endOfWeek, eachDayOfInterval, eachHourOfInterval, startOfDay, endOfDay, isSameWeek, isSameHour, isSameDay } from 'date-fns'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import CalendarDayEvents from './CalendarDayEvents'

const CalendarWeek = ({
  currentDate,
  viewDate,
  projectList
}) => {
  const dayHours = eachHourOfInterval({
    start: startOfDay(viewDate),
    end: endOfDay(viewDate)
  })
  const weekProjectList = projectList.filter(event => isSameWeek(new Date(event.dateDue), viewDate))
  const weekdayData = eachDayOfInterval({ start: startOfWeek(viewDate), end: endOfWeek(viewDate) })
  return (
    <>
      <GridList cellHeight='auto' cols={15} style={{ borderRight: '1px solid lightgrey' }}>
        <GridListTile
          cols={1}
          style={{ display: 'flex', border: '1px solid lightgrey', borderRight: 'none', borderBottom: 'none', justifyContent: 'center' }}
        >
          <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase' }}>Time</Typography>
        </GridListTile>
        {weekdayData.map((day, i) => (
          <GridListTile
            key={day}
            cols={2}
            style={{
              display: 'flex',
              flex: 2,
              border: '1px solid lightgrey',
              borderRight: 'none',
              borderBottom: 'none',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase' }}>{format(day, 'EEE')}</Typography>
              <Typography variant='h6' color='textSecondary'>{format(day, 'd')}</Typography>
            </div>
          </GridListTile>
        ))}
      </GridList>
      <div style={{ borderBottom: '1px solid lightgrey' }}>
        {dayHours.map((time) => (
          <GridList key={time} cellHeight='auto' cols={15} style={{ borderRight: '1px solid lightgrey' }}>
            <GridListTile
              cols={1}
              style={{ display: 'flex', border: '1px solid lightgrey', borderRight: 'none', borderBottom: 'none', justifyContent: 'center' }}
            >
              <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase' }}>{format(time, 'h a')}</Typography>
            </GridListTile>
            {weekdayData.map((day, i) => (
              <GridListTile
                key={day}
                cols={2}
                style={{
                  display: 'flex',
                  border: '1px solid lightgrey',
                  borderRight: 'none',
                  borderBottom: 'none',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CalendarDayEvents
                  fullWidth
                  events={weekProjectList.filter(event =>
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
                  )}
                />
              </GridListTile>
            ))}
          </GridList>
        ))}
      </div>
    </>
  )
}

export default CalendarWeek
