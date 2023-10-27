import React, { useMemo } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar from '@mui/material/Avatar'
import { getStatusColor } from '../lib/utils'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { motion } from 'framer-motion'
import DateIcon from './DateIcon'
import { NextLinkComposed } from './Link'
import Card from '@mui/material/Card'
import { CardActionArea } from '@mui/material'

const EventTile = ({ event }) => (
  useMemo(() => {
    return (
      <Grid item>
        <motion.div whileHover={{ y: -10 }} style={{ height: '100%' }}>
          <Card variant='outlined' style={{ padding: 3, height: '100%' }}>
            <CardActionArea
              to={{ pathname: `/quotations/${event._id}` }}
              component={NextLinkComposed}
              onClick={(e) => e.stopPropagation()}
              style={{ height: '100%' }}
            >
              <Grid
                container
                direction='column'
                alignItems='center'
                justifyContent='flex-start'
                spacing={0}
                style={{
                  width: 136,
                  marginRight: 16,
                  marginLeft: -4,
                  height: '100%'
                }}
              >
                <Grid item>
                  <DateIcon event={event} status />
                </Grid>
                <Typography variant='caption' color='textSecondary' style={{ textTransform: 'uppercase' }}>{event.salesRef.name}</Typography>
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
                <Grid item style={{ marginTop: 6 }}>
                  <Typography variant='body2' color='textSecondary' align='center' style={{ fontWeight: 'bold' }}>{event.title}</Typography>
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        </motion.div>
      </Grid>
    )
  }, [event])
)

export default EventTile
