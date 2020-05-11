import React from 'react'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { formatDistance } from 'date-fns'

const Comment = ({ comment }) => {
  const timePosted = formatDistance(
    comment.dateCreated,
    new Date(),
    { addSuffix: true }
  )
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'colummn' }}>
        <Avatar>{comment.user.name.charAt(0)}</Avatar>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant='body2' gutterBottom style={{ fontWeight: 'bold', marginLeft: 12 }}>{comment.user.name}</Typography>
            <Typography variant='body2' color='textSecondary' style={{ marginLeft: 6 }}>{timePosted}</Typography>
          </div>
          <Typography variant='body2' style={{ marginLeft: 12 }}>{comment.message}</Typography>
          <Button>Reply</Button>
        </div>
      </div>
      {comment.replies.map(reply => {
        const replyTimePosted = formatDistance(
          reply.dateCreated,
          new Date(),
          { addSuffix: true }
        )
        return (
          <Grid key={reply.id} container item direction='row' style={{ marginLeft: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'colummn' }}>
              <Avatar style={{ height: 30, width: 30 }}>{reply.user.name.charAt(0)}</Avatar>
              <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography variant='body2' gutterBottom style={{ fontWeight: 'bold', marginLeft: 12 }}>{reply.user.name}</Typography>
                  <Typography variant='body2' color='textSecondary' style={{ marginLeft: 6 }}>{replyTimePosted}</Typography>
                  {reply.edited &&
                    <Typography variant='body2' color='textSecondary' style={{ marginLeft: 6 }}>
                (edited)
                    </Typography>}
                </div>
                <Typography variant='body2' style={{ marginLeft: 12 }}>{reply.message}</Typography>
                <Button>Reply</Button>
              </div>
            </div>
          </Grid>
        )
      })}
    </>
  )
}

export default Comment
