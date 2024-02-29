import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { formatDistance } from 'date-fns'
import { useAuth } from './AuthProvider'
import TextField from '@mui/material/TextField'
import { FIND_PROJECTS_BY_IDV10 } from '../lib/queries/findProjectsById'
import { CREATE_COMMENTV10 } from '../lib/mutations/createComment'
import { UPDATE_COMMENTSV10 } from '../lib/mutations/updateComment'
import { useMutation } from '@apollo/client'
import CircularProgress from '@mui/material/CircularProgress'

const Comment = ({ comment, groupedComments, id }) => {
  const { user } = useAuth()
  const [reply, setReply] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editText, setEditText] = useState(comment.message)
  const handleEditChange = (event) => {
    setEditText(event.target.value)
  }
  const [commentText, setCommentText] = useState()
  const handleChange = (event) => {
    setCommentText(event.target.value)
  }
  const nestedComments = (groupedComments[comment.id] || []).map(comment => {
    return <Comment key={comment.id} comment={comment} groupedComments={groupedComments} id={id} />
  })
  const timePosted = formatDistance(
    new Date(comment.dateCreated),
    new Date(),
    { addSuffix: true }
  )
  const [createComments, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_COMMENTV10, {
    refetchQueries: [{ query: FIND_PROJECTS_BY_IDV10, variables: { id } }],
    awaitRefetchQueries: true,
    variables: {
      data: {
        project: id,
        dateCreated: new Date().toISOString(),
        message: commentText,
        user: user.id,
        edited: false,
        replyTo: comment.id
      }
    },
    onCompleted: () => {
      setReply(false)
      setCommentText('')
    }
  })
  const [updateComments, { loading: updateMutationLoading, error: updateMutationError }] = useMutation(UPDATE_COMMENTSV10, {
    refetchQueries: [{ query: FIND_PROJECTS_BY_IDV10, variables: { id } }],
    awaitRefetchQueries: true,
    variables: {
      id: comment.id,
      data: {
        message: editText,
        edited: true
      }
    },
    onCompleted: () => {
      setEdit(false)
    }
  })
  return (
    <Grid item xs={12} style={{ marginLeft: 30, borderLeft: '2px solid lightgrey', paddingLeft: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'colummn', flexWrap: 'nowrap' }}>
        <Avatar style={{ height: 30, width: 30 }}>{comment.user.name.charAt(0)}</Avatar>
        <div style={{ flexGrow: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant='body2' noWrap gutterBottom style={{ fontWeight: 'bold', marginLeft: 12 }}>{comment.user.name}</Typography>
            <Typography variant='body2' noWrap color='textSecondary' style={{ marginLeft: 6 }}>{timePosted}</Typography>
            {comment.edited && <Typography variant='caption' color='textSecondary' style={{ marginLeft: 4, marginTop: 2 }}>(edited)</Typography>}
          </div>
          {edit
            ? (
              <TextField
                id='edit-comment'
                label='Edit Comment'
                variant='outlined'
                autoComplete='off'
                style={{ marginTop: 8 }}
                fullWidth
                value={editText}
                onChange={handleEditChange}
              />
              )
            : <Typography variant='body2' style={{ marginLeft: 12 }}>{comment.message}</Typography>}

          {reply
            ? (
              <div style={{ width: '100%', padding: 10, paddingLeft: 0, marginLeft: -30 }}>
                <TextField
                  id='standard-basic'
                  style={{ marginLeft: 30 }}
                  label='Add A Reply...'
                  variant='outlined'
                  autoComplete='off'
                  fullWidth
                  value={commentText}
                  onChange={handleChange}
                />
                <div style={{ marginTop: 10, marginLeft: 30, marginBottom: 6 }}>
                  <Button disabled={!commentText} onClick={() => createComments()} variant='contained' size='small' color='primary'>{mutationLoading ? <CircularProgress style={{ height: 24, width: 24, color: 'white' }} /> : 'Submit'}</Button>
                  <Button
                    size='small'
                    onClick={() => {
                      setReply(false)
                      setCommentText('')
                    }}
                  >Cancel
                  </Button>
                  {mutationError && <Typography error>{mutationError.message}</Typography>}
                </div>
              </div>
              )
            : (
              <div style={{ margin: 10, marginLeft: 0 }}>
                {!edit && <Button onClick={() => setReply(!reply)} size='small'>Reply</Button>}
                {user.id === comment.user.id && (
                  <>
                    {edit && <Button disabled={editText === comment.message} onClick={() => updateComments()} variant='contained' size='small' color='primary'>{updateMutationLoading ? <CircularProgress style={{ height: 24, width: 24, color: 'white' }} /> : 'Submit'}</Button>}
                    <Button
                      size='small'
                      onClick={() =>
                        setEdit(!edit)}
                    >{edit ? 'Cancel' : 'Edit'}
                    </Button>
                  </>
                )}
                {updateMutationError && <Typography error>{updateMutationError.message}</Typography>}
              </div>
              )}
        </div>
      </div>
      {nestedComments}
    </Grid>
  )
}

export default Comment
