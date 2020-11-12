import React, { useMemo } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import AvatarGroup from '@material-ui/core/AvatarGroup'
import Avatar from '@material-ui/core/Avatar'
import { getStatusColor } from '../testApi/utils'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { motion } from 'framer-motion'
import DateIcon from './DateIcon'
import InternalLink from './InternalLink'

const EventTile = ({ event }) => (
  useMemo(() => {
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
                        <Avatar style={{ backgroundColor: customerStatusColor }}>
                          {customer.customerRef.name.charAt(0)}
                        </Avatar>
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
  }, [event])
)

export default EventTile
