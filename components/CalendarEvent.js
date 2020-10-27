import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Comment from './Comment'
import EventTitle from './EventTitle'
import CustomerCard from './CustomerCard'
import { motion, AnimatePresence } from 'framer-motion'
import EditProjectDialog from './EditProjectDialog'
import AddCustomersDialog from './AddCustomersDialog'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { useQuery, useMutation } from '@apollo/client'
import { FIND_PROJECTS_BY_ID } from '../testApi/queries/findProjectsById'
import { CREATE_COMMENT } from '../testApi/mutations/createComment'
import { useAuth } from './AuthProvider'
import CircularProgress from '@material-ui/core/CircularProgress'
import { compareDesc } from 'date-fns'
import { groupBy } from '../testApi/utils'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import CustomerStatusBoard from './CustomerStatusBoard'

const CalendarEvent = ({ id }) => {
  // const temp = ['375fc2cb384d29ae', 'a996530b6030574d', '068b9689b1e66cc4', 'ae68aa3703b55a7a', '435f42aa8c93d58f']
  const [comment, setComment] = useState()
  const handleChange = (event) => {
    setComment(event.target.value)
  }
  const [dialogOpen, setDialogOpen] = useState(false)
  const [addCustomersDialogOpen, setAddCustomersDialogOpen] = useState(false)
  const handleClickOpen = () => {
    setDialogOpen(true)
  }
  const handleAddCustomersClickOpen = () => {
    setAddCustomersDialogOpen(true)
  }
  const { user } = useAuth()
  const [createComments, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: FIND_PROJECTS_BY_ID, variables: { id } }],
    awaitRefretchQueries: true,
    variables: {
      data: {
        project: { connect: id },
        dateCreated: new Date().toISOString(),
        message: comment,
        user: { connect: user._id },
        edited: false,
        replyTo: null
      }
    },
    onCompleted: () => setComment('')
  })
  const { loading, error, data } = useQuery(FIND_PROJECTS_BY_ID, { variables: { id } })
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const event = data.findProjectsByID
  const sortedComments = data.findProjectsByID.comments.data.slice().sort((a, b) => compareDesc(new Date(a.dateCreated), new Date(b.dateCreated)))
  const groupedComments = groupBy(sortedComments, 'replyTo')
  const fullComments = groupedComments.null || []
  const pageVariants = { initial: { opacity: 0 }, in: { opacity: 1 }, out: { opacity: 0 } }
  const fullAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(event.amount / 10000)
  return (
    <AnimatePresence>
      <>
        <motion.div
          initial='initial'
          animate='in'
          exit='out'
          variants={pageVariants}
        >
          <Grid container alignItems='center'>
            <Typography variant='h6' style={{ fontWeight: 'light', color: 'green', marginRight: 12 }}>Current Project Value: {fullAmount}</Typography>
            <Tooltip title='Edit Project' placement='right'>
              <IconButton aria-label='edit' onClick={() => handleClickOpen()}>
                <EditIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Grid>
          <Divider style={{ marginBottom: 12, marginTop: 4 }} />
          <Grid container>
            <Grid item style={{ flex: 1, marginRight: 10 }}>
              <EventTitle event={event} />
            </Grid>
            <Grid item style={{ flex: 2 }}>
              <CustomerStatusBoard customerList={event.customerList.data} />
            </Grid>

          </Grid>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          {/*
                    <Button
            onClick={handleAddCustomersClickOpen}
            startIcon={<GroupAddIcon />}
            style={{ marginTop: 12, marginBottom: 12 }}
          >
        Add Customers
          </Button>
          <Grid container spacing={2} direction='row' alignItems='stretch'>
            {event.customerList.data.map(customer =>
              <Grid item key={customer.customerRef.account}>
                <CustomerCard customer={customer} fullAmount={event.amount} id={id} customerCount={event.customerList.data.length} />
              </Grid>
            )}
          </Grid>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          */}
          <Typography variant='subtitle1' style={{ marginBottom: 15 }}>{data.findProjectsByID.comments.data.length} Comments</Typography>
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
                <Button
                  onClick={() => createComments()}
                  variant='contained'
                  color='primary'
                >
                  {mutationLoading
                    ? <CircularProgress style={{ height: 24, width: 24, color: 'white' }} />
                    : 'Submit'}
                </Button>
                {mutationError && <Typography error>{mutationError.message}</Typography>}
              </div>}
          </Grid>
          <Grid container spacing={2} style={{ marginLeft: -60 }}>
            {fullComments.map((comment) =>
              <Comment key={comment._id} comment={comment} groupedComments={groupedComments} id={id} />
            )}
          </Grid>
        </motion.div>
        <EditProjectDialog event={event} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
        <AddCustomersDialog
          event={event}
          dialogOpen={addCustomersDialogOpen}
          setDialogOpen={setAddCustomersDialogOpen}
          query={FIND_PROJECTS_BY_ID}
          variables={id}
        />
      </>
    </AnimatePresence>
  )
}

export default CalendarEvent
