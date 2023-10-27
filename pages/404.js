import React from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Router from 'next/router'

const Custom404 = () => {
  return (
    <Container align='center' maxWidth={false} style={{ height: '100vh', alignItems: 'center' }}>
      <div style={{ height: '30vh' }} />
      <Typography variant='h2' component='h2'>Oops!</Typography>
      <Typography variant='h5' component='h2'>404 - Page Not Found</Typography>
      <Button variant='outlined' style={{ marginTop: 20 }} onClick={() => Router.back()}>
        Take me back
      </Button>
    </Container>
  )
}

export default Custom404
