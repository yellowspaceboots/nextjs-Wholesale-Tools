import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Comment from './Comment'

const ProjectComments = ({ id, myComments, myReplies, fullComments }) => {
  const [comment, setComment] = useState()
  const handleChange = (event) => {
    setComment(event.target.value)
  }
  return (
    <>
      <Typography variant='subtitle1' style={{ marginBottom: 15 }}>{myComments.length + myReplies.length} Comments</Typography>
      <Grid item style={{ marginBottom: 20, marginLeft: -8 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Avatar alt='Jon Busch' src='/broken-image.jpg' style={{ marginRight: 12 }} />
          <TextField
            id='standard-basic'
            label='Add A Comment...'
            variant='outlined'
            autoComplete='off'
            fullWidth
            value={comment}
            onChange={handleChange}
          />
        </div>
        {comment &&
          <div style={{ marginTop: 10, float: 'right' }}>
            <Button style={{ marginRight: 10 }} onClick={() => setComment('')}>Cancel</Button>
            <Button variant='contained' color='primary'>Submit</Button>
          </div>}
      </Grid>
      <Grid container spacing={2}>
        {fullComments.map((comment, i) =>
          <Comment key={i} comment={comment} />
        )}
      </Grid>
    </>
  )
}

export default ProjectComments
