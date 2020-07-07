import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { formatDistance } from 'date-fns'
import { useAuth } from './AuthProvider'
import TextField from '@material-ui/core/TextField'
import { FIND_PROJECTS_BY_ID } from '../testApi/queries/findProjectsById'
import { CREATE_COMMENT } from '../testApi/mutations/createComment'
import { UPDATE_COMMENTS } from '../testApi/mutations/updateComment'
import { useMutation } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

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
  const nestedComments = (groupedComments[comment._id] || []).map(comment => {
    return <Comment key={comment._id} comment={comment} groupedComments={groupedComments} id={id} />
  })
  const timePosted = formatDistance(
    new Date(comment.dateCreated),
    new Date(),
    { addSuffix: true }
  )
  const [createComments, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: FIND_PROJECTS_BY_ID, variables: { id } }],
    awaitRefetchQueries: true,
    variables: {
      data: {
        project: { connect: id },
        dateCreated: new Date().toISOString(),
        message: commentText,
        user: { connect: user._id },
        edited: false,
        replyTo: comment._id
      }
    },
    onCompleted: () => {
      setReply(false)
      setCommentText('')
    }
  })
  const [updateComments, { loading: updateMutationLoading, error: updateMutationError }] = useMutation(UPDATE_COMMENTS, {
    refetchQueries: [{ query: FIND_PROJECTS_BY_ID, variables: { id } }],
    awaitRefetchQueries: true,
    variables: {
      id: comment._id,
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
            {comment.edited && <Typography variant='caption' color='textSecondary' style={{ marginLeft: 4, marginTop: 2 }}>{`(edited)`}</Typography>}
          </div>
          {edit ? (
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
          ) : <Typography variant='body2' style={{ marginLeft: 12 }}>{comment.message}</Typography>}

          {reply ? (
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
          ) : (
            <div style={{ margin: 10, marginLeft: 0 }}>
              {!edit && <Button onClick={() => setReply(!reply)} size='small'>Reply</Button>}
              {user._id === comment.user._id && (
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
