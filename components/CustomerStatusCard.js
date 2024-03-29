import React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { amountShortFormat } from '../lib/utils'
import Paper from '@mui/material/Paper'
import { CardActionArea } from '@mui/material'

const CustomerStatusCard = ({ customer, handlePopperClick }) => {
  const formattedAmount = amountShortFormat(customer.amount)
  return (
    <Card style={{ marginBottom: 8 }}>
      <CardActionArea onClick={handlePopperClick(customer)}>
        <CardContent style={{ padding: 8 }}>
          <div style={{ display: 'flex', marginBottom: 4 }}>
            <Paper elevation={0} style={{ paddingLeft: 4, paddingRight: 4, marginRight: 4, backgroundColor: 'lightgrey' }}>
              <Typography variant='caption' style={{ fontWeight: 'bold' }}>{customer.customerRef.account}</Typography>
            </Paper>
            <Paper elevation={0} style={{ paddingLeft: 4, paddingRight: 4, marginRight: 4, backgroundColor: 'lightgrey', flexGrow: 1 }}>
              <Typography variant='caption' style={{ fontWeight: 'bold' }}>{customer.customerRef.salesRef.name}</Typography>
            </Paper>
            <Paper elevation={0} style={{ paddingLeft: 4, paddingRight: 4, backgroundColor: 'green' }}>
              <Typography variant='caption' style={{ fontWeight: 'bold', color: 'white' }}>{formattedAmount}</Typography>
            </Paper>
          </div>
          <Typography color='textSecondary' style={{ marginLeft: 4 }}>
            {customer.customerRef.name}
          </Typography>
          <Typography color='textSecondary' variant='caption' style={{ marginLeft: 4 }}>
            This is a little note about this customer
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CustomerStatusCard
