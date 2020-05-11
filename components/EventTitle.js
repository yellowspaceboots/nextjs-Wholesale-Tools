import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Status from './Status'

const EventTitle = ({ event }) => {
  return (
    <Grid container wrap='nowrap' style={{ marginTop: 10 }}>
      <Grid item>
        <Avatar variant='rounded' style={{ marginRight: 20, marginTop: 6 }}>
          <AssignmentIcon />
        </Avatar>
      </Grid>
      <Grid item>
        <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'colummn', alignItems: 'center' }}>
          <Typography variant='h5' style={{ fontWeight: 'light', marginRight: 10 }}>{event.title}</Typography>
          <Status status={event.status} includeWords />
        </div>
        <Typography variant='body2' color='textSecondary'>{event.description}</Typography>
      </Grid>
    </Grid>
  )
}

export default EventTitle
