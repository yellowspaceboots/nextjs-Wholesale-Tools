import React from 'react'
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
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'

/*
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
      </CardContent>
      <CardActions>
        <IconButton size='small' aria-label='Delete'>
          <EditIcon fontSize='small' />
        </IconButton>
        <IconButton size='small' aria-label='Delete'>
          <DeleteOutlineIcon fontSize='small' />
        </IconButton>
      </CardActions>
    </Card>
  */

const CustomerCard = ({ customer, open, setOpen }) => {
  const statusColor = getStatusColor(customer.status)
  return (
    <Dialog aria-labelledby='simple-dialog-title' onClose={() => setOpen(false)} open={open}>
      <DialogTitle id='simple-dialog-title'>{customer.name}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Email Address'
          type='email'
          fullWidth
        />
      </DialogContent>
    </Dialog>
  )
}

export default CustomerCard
