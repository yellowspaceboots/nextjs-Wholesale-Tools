import React from 'react'
import Typography from '@mui/material/Typography'
import { format, isAfter } from 'date-fns'
import { makeStyles } from '@mui/styles'
import Badge from '@mui/material/Badge'
import { getStatusColor, amountShortFormat, pad } from '../lib/utils'

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
    border: `solid 4px ${props.isLate ? theme.palette.error.dark : props.isClosed ? 'lightgrey' : 'grey'}`
  }),
  iconTitle: props => ({
    backgroundColor: props.isLate ? theme.palette.error.dark : props.isClosed ? 'lightgrey' : 'grey',
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
  const eventDate = event.dateDueDate
  const statusMap = {
    'On Track': 'open',
    'At Risk': 'open',
    'Off Track': 'open',
    Open: 'open',
    Pending: 'pending',
    Closed: 'closed'
  }
  const dueTime = format(new Date(eventDate), 'p')
  const dateDay = format(new Date(eventDate), 'd')
  const dateMonth = format(new Date(eventDate), 'MMM')
  const dateYear = format(new Date(eventDate), 'yyyy')
  const dateDayName = format(new Date(eventDate), 'EEEE')
  const statusColor = getStatusColor(event.status)
  const isLate = isAfter(new Date(), new Date(eventDate)) & statusMap[event.status] === 'open'
  const isClosed = event.status === 'Closed'
  const iconColor = 'grey'
  const iconBorder = `solid 2px ${iconColor}`
  const classes = useStyles({ color: statusColor, isLate, isClosed })
  const quotedCustomerList = event.customerList.data.filter(customer => customer.amount && customer.amount > 0)
  const totalAmount = quotedCustomerList.reduce((acc, obj) => acc + obj.amount, 0)
  const avgAmount = quotedCustomerList.length === 0 ? 0 : Math.round(totalAmount / quotedCustomerList.length)
  const formattedAmount = amountShortFormat(avgAmount)
  const formattedId = pad(event.requestId, 5)
  return (
    <div style={{ position: 'relative', padding: 22, textTransform: 'uppercase', paddingBottom: !status ? 0 : 22 }}>
      <Typography variant='body2' color='textSecondary' style={{ position: 'absolute', left: 6, top: 0, fontWeight: 'bold' }}>#</Typography>
      <Typography variant='body2' color='textSecondary' style={{ position: 'absolute', left: 24, top: 0, fontWeight: 'bold' }}>{formattedId}</Typography>
      <Typography variant='caption' color='textSecondary' style={{ position: 'absolute', left: 0, top: 22, writingMode: 'vertical-rl', textOrientation: 'upright' }}>{event.size}</Typography>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', right: 0, bottom: 0, borderRight: iconBorder, borderBottom: iconBorder, borderRadius: '10%', height: 80, width: 85 }} />
        <div style={{ position: 'absolute', left: 0, top: 0, borderLeft: iconBorder, borderTop: iconBorder, borderRadius: '10%', height: 80, width: 85 }} />
        <Badge overlap='circular' badgeContent=' ' invisible={!status} classes={{ badge: classes.customBadge }}>
          <div className={classes.iconRoot}>
            <Typography variant='caption' align='center' className={classes.iconTitle}>
              {dateMonth} {dateYear}
            </Typography>
            <Typography variant='h5' className={classes.iconBody}>{dateDay}</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant='caption' className={classes.iconBody}>{dateDayName}</Typography>
              <Typography variant='caption' className={classes.iconBody} style={{ marginTop: -4, fontWeight: 900 }}>@{dueTime}</Typography>
            </div>
          </div>
        </Badge>
      </div>
      {status && <Typography variant='body2' style={{ position: 'absolute', right: 24, bottom: 0, fontWeight: 'bold', color: 'green' }}>Avg: {formattedAmount}</Typography>}
    </div>
  )
}

export default DateIcon
