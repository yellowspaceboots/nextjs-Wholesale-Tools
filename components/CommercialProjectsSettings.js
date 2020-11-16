import React from 'react'
import Link from './Link'
import Typography from '@material-ui/core/Typography'

const CommercialProjectsSettings = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='subtitle1' gutterBottom>Commercial Projects</Typography>
      <Link href='settings/commercial-projects/edit-salesman-list' variant='body2'>
        Edit Assignable Salesman List
      </Link>
      <Link href='settings/commercial-projects/edit-customer-list' variant='body2'>
        Edit Assignable Customer List
      </Link>
    </div>
  )
}

export default CommercialProjectsSettings
