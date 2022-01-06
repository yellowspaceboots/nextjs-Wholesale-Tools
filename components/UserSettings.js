import React from 'react'
import Link from './Link'
import Typography from '@mui/material/Typography'

const UserSettings = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='subtitle1' gutterBottom>Users</Typography>
      <Link href='/settings/users' variant='body2'>
        Users
      </Link>
    </div>
  )
}

export default UserSettings
