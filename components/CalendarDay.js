import React from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

const CalendarDay = ({
  currentDate,
  viewDate
}) => {
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
      {times.map((time) => (
        <GridList key={time} cellHeight={50} cols={15} style={{ borderRight: '1px solid lightgrey' }}>
          <GridListTile
            cols={1}
            style={{ display: 'flex', border: '1px solid lightgrey', borderRight: 'none', borderBottom: 'none', justifyContent: 'center' }}
          >
            <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase' }}>{time}</Typography>
          </GridListTile>
          <GridListTile
            cols={14}
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
        </GridList>
      ))}
    </>
  )
}

export default CalendarDay
