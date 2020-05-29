import React from 'react'
import Typography from '@material-ui/core/Typography'
import { format, isAfter } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import { getStatusColor, amountShortFormat } from '../api/utils'

const useStyles = makeStyles(theme => ({
  customBadge: {
    backgroundColor: props => props.color,
    marginTop: -6,
    marginRight: -6,
    color: 'white'
  },
  iconRoot: props => ({
    height: 100,
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderRadius: '10%',
    margin: 6,
    border: `solid 4px ${props.isLate ? theme.palette.error.dark : 'grey'}`
  }),
  iconTitle: props => ({
    backgroundColor: props.isLate ? theme.palette.error.dark : 'grey',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    width: 'calc(100% + 2px)',
    padding: 4,
    marginTop: -2,
    color: 'whitesmoke',
    fontWeight: 'bold'
  }),
  iconBody: props => ({
    color: props.isLate ? theme.palette.error.dark : 'grey'
  })
}))

const DateIcon = ({ event, status }) => {
  const dateDay = format(event.dateDue, 'd')
  const dateMonth = format(event.dateDue, 'MMM')
  const dateDayName = format(event.dateDue, 'EEEE')
  const statusColor = getStatusColor(event.status)
  const isLate = isAfter(new Date(), event.dateDue)
  const classes = useStyles({ color: statusColor, isLate })
  const formattedAmount = amountShortFormat(event.amount)
  return (
    <div style={{ position: 'relative', padding: 22, textTransform: 'uppercase' }}>
      <Typography variant='body2' color='textSecondary' style={{ position: 'absolute', left: 6, top: 0, fontWeight: 'bold' }}>#</Typography>
      <Typography variant='body2' color='textSecondary' style={{ position: 'absolute', left: 24, top: 0, fontWeight: 'bold' }}>{event.requestId}</Typography>
      <Typography variant='caption' color='textSecondary' style={{ position: 'absolute', left: 0, top: 22, writingMode: 'vertical-rl', textOrientation: 'upright' }}>{event.size}</Typography>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', right: 0, bottom: 0, borderRight: 'solid 2px grey', borderBottom: 'solid 2px grey', borderRadius: '10%', height: 80, width: 85 }} />
        <div style={{ position: 'absolute', left: 0, top: 0, borderLeft: 'solid 2px grey', borderTop: 'solid 2px grey', borderRadius: '10%', height: 80, width: 85 }} />
        <Badge overlap='circle' badgeContent=' ' invisible={!status} classes={{ badge: classes.customBadge }}>
          <div className={classes.iconRoot}>
            <Typography variant='caption' align='center' className={classes.iconTitle}>
              {dateMonth}
            </Typography>
            <Typography variant='h5' className={classes.iconBody}>{dateDay}</Typography>
            <Typography variant='caption' className={classes.iconBody}>{dateDayName}</Typography>
          </div>
        </Badge>
      </div>
      {status && <Typography variant='body2' style={{ position: 'absolute', right: 24, bottom: 0, fontWeight: 'bold', color: 'green' }}>{formattedAmount}</Typography>}
    </div>
  )
}

export default DateIcon
