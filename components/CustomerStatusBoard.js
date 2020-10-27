import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import { getStatusColor } from '../testApi/utils'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import IconButton from '@material-ui/core/IconButton'

const CustomerStatusBoard = ({ customerList }) => {
  const statuses = ['Open', 'Pending', 'Won', 'Lost'].map(name => {
    const color = getStatusColor(name)
    return {
      name,
      color,
      customerList: customerList.filter(customer => customer.status === name)
    }
  })
  return (
    <div style={{ display: 'flex', justifyContent: 'stretch', width: '100%', overflow: 'auto' }}>
      {statuses.map(status => {
        return (
          <Card key={status.name} style={{ width: 300, backgroundColor: status.color, marginRight: 20 }}>
            <CardContent style={{ padding: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', height: 40 }}>
                <Typography
                  style={{ color: 'white', flexGrow: 1 }}
                  gutterBottom
                >
                  {status.name}
                </Typography>
                {status.name === 'Open' && (
                  <IconButton aria-label='edit' onClick={() => console.log('placeholder')}>
                    <GroupAddIcon fontSize='small' style={{ color: 'white' }} />
                  </IconButton>
                )}
              </div>
              <div style={{ height: 400, overflow: 'auto' }}>
                {status.customerList.map(customer => (
                  <Card key={customer.customerRef.account} style={{ marginBottom: 8 }}>
                    <CardContent style={{ padding: 8 }}>
                      <div style={{ display: 'flex', marginBottom: 4 }}>
                        <Paper elevation={0} style={{ paddingLeft: 4, paddingRight: 4, marginRight: 4, backgroundColor: 'lightgrey' }}>
                          <Typography variant='caption' style={{ fontWeight: 'bold' }}>{customer.customerRef.account}</Typography>
                        </Paper>
                        <Paper elevation={0} style={{ paddingLeft: 4, paddingRight: 4, backgroundColor: 'lightgrey' }}>
                          <Typography variant='caption' style={{ fontWeight: 'bold' }}>{customer.customerRef.salesRef.name}</Typography>
                        </Paper>
                      </div>
                      <Typography color='textSecondary' style={{ marginLeft: 4 }}>
                        {customer.customerRef.name}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default CustomerStatusBoard
