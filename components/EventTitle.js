import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import DateIcon from './DateIcon'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import { getStatusColor } from '../lib/utils'
import { formatDistanceToNow } from 'date-fns'

const EventTitle = ({ event }) => {
  const statusColor = getStatusColor(event.status)
  const dateToNow = formatDistanceToNow(new Date(event.dateEntered), { addSuffix: true })
  const editedDateToNow = formatDistanceToNow(new Date(event.dateEdited), { addSuffix: true })
  return (
    <Grid container>
      <Grid item>
        <DateIcon event={event} status={false} />
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='caption' align='center' color='textSecondary' style={{ textTransform: 'uppercase', margin: 8, textAlign: 'center' }}>{event.salesRef.name}</Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container style={{ marginBottom: 12 }}>
          <Chip
            label={event.status}
            variant='outlined'
            style={{
              height: 28,
              color: statusColor,
              borderColor: statusColor,
              marginRight: 10,
              marginTop: 3
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
        </Grid>
        <Typography variant='body2' color='textSecondary' style={{ fontStyle: 'italic', maxWidth: 600 }}>{event.description}</Typography>
        <Typography variant='body2' color='textSecondary' style={{ marginTop: 10 }}>Added {dateToNow} by {event.createdBy.name}</Typography>
        <Typography variant='body2' color='textSecondary' style={{ marginBottom: 10 }}>Last edited {editedDateToNow} by {event.editedBy.name}</Typography>
      </Grid>
    </Grid>
  )
}

export default EventTitle
