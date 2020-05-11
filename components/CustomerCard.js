import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Status from './Status'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'

const CustomerCard = ({ customer }) => {
  return (
    <Card variant='outlined' style={{ borderColor: (customer.status === 'Won' && 'green') || (customer.status === 'Lost' && 'red') }}>
      <CardContent>
        <Typography color='textSecondary' style={{ fontSize: 14 }}>
                Account: {customer.account}
        </Typography>
        <Typography color='textSecondary' style={{ fontSize: 14 }} gutterBottom>
          {customer.salesman}
        </Typography>
        <Typography variant='h5' component='h2'>
          {customer.name}
        </Typography>
        <Status status={customer.status} includeWords />
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
  )
}

export default CustomerCard
