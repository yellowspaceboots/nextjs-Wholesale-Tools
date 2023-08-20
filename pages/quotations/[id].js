import { getLayout } from '../../components/Layout'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Comment from '../../components/Comment'
import EventTitle from '../../components/EventTitle'
import { motion, AnimatePresence } from 'framer-motion'
import EditProjectDialog from '../../components/EditProjectDialog'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useQuery, useMutation } from '@apollo/client'
import { FIND_PROJECTS_BY_ID } from '../../lib/queries/findProjectsById'
import { CREATE_COMMENT } from '../../lib/mutations/createComment'
import { useAuth } from '../../components/AuthProvider'
import CircularProgress from '@mui/material/CircularProgress'
import { compareDesc } from 'date-fns'
import { groupBy, parseCookies } from '../../lib/utils'
import CustomerStatusBoard from '../../components/CustomerStatusBoard'
import { initializeApollo, addApolloState } from '../../lib/apollo'

const Event = (props) => {
  console.log(props)
  const router = useRouter()
  const { id } = router.query
  const [comment, setComment] = useState()
  const handleChange = (event) => {
    setComment(event.target.value)
  }
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleClickOpen = () => {
    setDialogOpen(true)
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
  const sortedComments = data.findProjectsByID?.comments.data.slice().sort((a, b) => compareDesc(new Date(a.dateCreated), new Date(b.dateCreated)))
  const groupedComments = groupBy(sortedComments, 'replyTo')
  const fullComments = groupedComments.null || []
  const pageVariants = { initial: { opacity: 0 }, in: { opacity: 1 }, out: { opacity: 0 } }
  const quotedCustomerList = event.customerList.data.filter(customer => customer.amount && customer.amount > 0)
  const totalAmount = quotedCustomerList.reduce((acc, obj) => acc + obj.amount, 0)
  const avgAmount = quotedCustomerList.length === 0 ? 0 : Math.round(totalAmount / quotedCustomerList.length)
  const fullAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(avgAmount / 10000)
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
            <Typography variant='h5' style={{ fontWeight: 'light', marginRight: 10, flexGrow: 1 }}>{event.title}</Typography>
            <Typography variant='h6' style={{ fontWeight: 'light', color: 'green', marginRight: 12 }}>Average Quotation Value: {fullAmount}</Typography>
            <Tooltip title='Edit Project' placement='right'>
              <IconButton aria-label='edit' onClick={() => handleClickOpen()}>
                <EditIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Grid>
          <Divider style={{ marginBottom: 12, marginTop: 4 }} />
          <Grid container>
            <Grid item xs={2} style={{ flex: 1, marginRight: 10, minWidth: 250 }}>
              <EventTitle event={event} />
            </Grid>
            <Grid item style={{ maxWidth: '100%' }}>
              <CustomerStatusBoard id={id} customerList={event.customerList.data} />
            </Grid>
          </Grid>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
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
      </>
    </AnimatePresence>
  )
}

Event.getLayout = getLayout

export async function getServerSideProps(context) {
  const cookies = parseCookies(context.req)
  console.log(cookies)
  const apolloClient = initializeApollo(context, null, cookies)

  await apolloClient.query({
    query: FIND_PROJECTS_BY_ID,
    variables: {...context.params},
  })
  
  return addApolloState(apolloClient, {
    props: {},
  })
}

export default Event
