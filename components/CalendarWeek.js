import React from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

const CalendarWeek = ({
  currentDate,
  viewDate
}) => {
  const weekdayData = eachDayOfInterval({ start: startOfWeek(viewDate), end: endOfWeek(viewDate) })
  const timesAM = [...Array(12).keys()].map(time => time === 0 ? '12 am' : `${time} am`)
  const timesPM = [...Array(12).keys()].map(time => time === 0 ? '12 pm' : `${time} pm`)
  const times = [...timesAM, ...timesPM]
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
      {times.map((time) => (
        <GridList key={time} cellHeight={50} cols={15} style={{ borderRight: '1px solid lightgrey' }}>
          <GridListTile
            cols={1}
            style={{ display: 'flex', border: '1px solid lightgrey', borderRight: 'none', borderBottom: 'none', justifyContent: 'center' }}
          >
            <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase' }}>{time}</Typography>
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
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} />
            </GridListTile>
          ))}
        </GridList>
      ))}
    </>
  )
}

export default CalendarWeek
