import React from 'react'
import Link from './Link'

const CommercialProjectsSettings = ({ events }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <Link href='/commercial-projects/edit-salesman-list' variant='body2'>
        Edit Assignable Salesman List
      </Link>
      <Link href='/commercial-projects/edit-customer-list' variant='body2'>
        Edit Assignable Customer List
      </Link>
    </div>
  )
}

export default CommercialProjectsSettings
