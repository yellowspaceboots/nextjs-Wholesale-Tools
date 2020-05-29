import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import { getStatusColor } from '../api/utils'
import CustomerDialog from './CustomerDialog'

const CustomerCard = ({ customer, fullAmount }) => {
  const [open, setOpen] = useState(false)
  const statusColor = getStatusColor(customer.status)
  const customerFullAmount = customer.fullAmount || fullAmount
  return (
    <>
      <Card variant='outlined' style={{ borderColor: (customer.status === 'Won' && 'green') || (customer.status === 'Lost' && 'red') }}>
        <CardContent style={{ paddingBottom: 0 }}>
          <Typography color='textSecondary' style={{ fontSize: 14 }}>
                Account: {customer.account}
          </Typography>
          <Typography color='textSecondary' style={{ fontSize: 14 }}>
            {customer.salesman.name}
          </Typography>
          <Typography variant='h6' style={{ fontWeight: 'lighter' }} gutterBottom>
            {customer.name}
          </Typography>
          <Chip
            label={customer.status}
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
          <p>{customerFullAmount}</p>
        </CardContent>
        <CardActions>
          <IconButton size='small' aria-label='Delete' onClick={() => setOpen(!open)}>
            <EditIcon fontSize='small' />
          </IconButton>
        </CardActions>
      </Card>
      <CustomerDialog customer={customer} open={open} setOpen={setOpen} />
    </>
  )
}

export default CustomerCard
