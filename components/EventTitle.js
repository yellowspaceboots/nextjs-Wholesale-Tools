import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import DateIcon from './DateIcon'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import { getStatusColor } from '../api/utils'
import { formatDistanceToNow } from 'date-fns'
import EditProjectDialog from './EditProjectDialog'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'

const EventTitle = ({ event }) => {
  const statusColor = getStatusColor(event.status)
  const fullAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(event.amount / 10000)
  const dateToNow = formatDistanceToNow(event.dateEntered, { addSuffix: true })
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleClickOpen = () => {
    setDialogOpen(true)
  }
  return (
    <Grid container wrap='nowrap'>
      <Grid item>
        <DateIcon event={event} status={false} />
      </Grid>
      <Grid item xs={12} style={{ marginTop: 28 }}>
        <Grid container alignItems='center'>
          <Chip
            label={event.status}
            variant='outlined'
            style={{
              height: 28,
              color: statusColor,
              borderColor: statusColor
            }}
            avatar={
              <Avatar
                style={{
                  backgroundColor: statusColor,
                  color: statusColor,
                  height: 20,
                  width: 20
                }}
              />
            }
          />
          <Typography variant='h6' style={{ fontWeight: 'light', marginLeft: 10, marginTop: -2, flexGrow: 1 }}>{fullAmount}</Typography>
          <IconButton aria-label='edit' onClick={() => handleClickOpen()}>
            <EditIcon fontSize='small' />
          </IconButton>
        </Grid>
        <Typography variant='h5' style={{ fontWeight: 'light', marginRight: 10 }}>{event.title}</Typography>
        <Typography variant='body2' color='textSecondary'>{event.description}</Typography>
        <Typography variant='body2' color='textSecondary' style={{ marginBottom: 10 }}>Added {dateToNow}</Typography>
      </Grid>
      <EditProjectDialog event={event} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </Grid>
  )
}

export default EventTitle
