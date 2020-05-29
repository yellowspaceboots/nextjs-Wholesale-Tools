import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { eventData, comments } from '../api/mock'
import Comment from './Comment'
import EventTitle from './EventTitle'
import CustomerCard from './CustomerCard'

const CalendarEvent = ({ id }) => {
  const temp = [
    '375fc2cb384d29ae',
    'a996530b6030574d',
    '068b9689b1e66cc4',
    'ae68aa3703b55a7a',
    '435f42aa8c93d58f'
  ]
  const [comment, setComment] = useState()
  const handleChange = (event) => {
    setComment(event.target.value)
  }
  const event = eventData.find(event => String(event.id) === String(id))
  const myComments = comments.filter(comment => String(comment.eventId) === String(id) && comment.replyTo === null)
  const myReplies = comments.filter(comment => String(comment.eventId) === String(id) && comment.replyTo !== null)
  const fullComments = myComments.map(comment => {
    const replies = myReplies.filter(reply => reply.replyTo === comment.id)
    return {
      ...comment,
      replies
    }
  })
  const fullAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(event.amount / 10000)
  return (
    <>
      <EventTitle event={event} />
      <Divider />
      <Typography variant='subtitle1' style={{ margin: 10, marginLeft: 0 }}>Customers</Typography>
      <Grid container spacing={2}>
        {event.customerList.map(customer =>
          <Grid item key={customer.account}>
            <CustomerCard customer={customer} fullAmount={fullAmount} />
          </Grid>
        )}
      </Grid>
      <Divider style={{ marginTop: 20, marginBottom: 20 }} />
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
        {fullComments.map(comment =>
          <Comment key={comment.id} comment={comment} />
        )}
      </Grid>
    </>
  )
}

export default CalendarEvent
