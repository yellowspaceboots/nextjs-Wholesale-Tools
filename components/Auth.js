import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const Auth = () => {
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      style={{ height: '100vh' }}
    >
      <CircularProgress style={{ marginTop: -200, marginBottom: 10 }} />
      <Typography variant='h4'>Authorizing...</Typography>
    </Grid>
  )
}

export default Auth
