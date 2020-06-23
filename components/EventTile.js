import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import Avatar from '@material-ui/core/Avatar'
import { getStatusColor } from '../api/utils'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { motion } from 'framer-motion'
import DateIcon from './DateIcon'
import InternalLink from './InternalLink'

const EventTile = ({ event }) => {
  return (
    <Grid item>
      <motion.div whileHover={{ y: -10 }}>
        <Button
          href='/event/[id]'
          as={`/event/${event._id}`}
          component={InternalLink}
          onClick={(e) => e.stopPropagation()}
          style={{ borderRadius: '20px', display: 'flex', alignItems: 'flex-start' }}
        >
          <Grid
            item
            container
            direction='column'
            alignItems='center'
            justify='flex-start'
            spacing={1}
            style={{
              width: 180,
              paddingBottom: 5
            }}
          >
            <Grid item>
              <DateIcon event={event} status />
            </Grid>
            <Typography variant='caption' color='textSecondary'>{event.salesRef.name}</Typography>
            <Grid item>
              <AvatarGroup max={4}>
                {event.customerList.data.map(customer => {
                  const customerStatusColor = getStatusColor(customer.status)
                  return (
                    <Tooltip key={customer.customerRef.account} title={customer.customerRef.name}>
                      <Avatar alt={customer.customerRef.name} src='/none' style={{ backgroundColor: customerStatusColor }} />
                    </Tooltip>
                  )
                })}
              </AvatarGroup>
            </Grid>
            <Grid item>
              <Typography variant='body2' color='textSecondary' align='center' style={{ textTransform: 'none', fontWeight: 'bold' }}>{event.title}</Typography>
            </Grid>
          </Grid>
        </Button>
      </motion.div>
    </Grid>
  )
}

export default EventTile
