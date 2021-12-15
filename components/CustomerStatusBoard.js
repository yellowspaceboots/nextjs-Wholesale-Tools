import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import { getStatusColor, amountShortFormat } from '../lib/utils'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import IconButton from '@material-ui/core/IconButton'
import CardActionArea from '@material-ui/core/CardActionArea'
import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CancelIcon from '@material-ui/icons/Cancel'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import { motion } from 'framer-motion'
import { FIND_PROJECTS_BY_ID } from '../lib/queries/findProjectsById'
import { DELETE_CUSTOMER_PROJECT_STATE } from '../lib/mutations/deleteCustomerProjectState'
import { ADD_CUSTOMERS_TO_PROJECT } from '../lib/mutations/addCustomersToProject'
import { UPDATE_CUSTOMER_PROJECT_STATE } from '../lib/mutations/updateCustomerProjectState'
import { useMutation } from '@apollo/client'
import LoadingButton from '@material-ui/lab/LoadingButton'
import AddCustomersDialog from './AddCustomersDialog'
import Tooltip from '@material-ui/core/Tooltip'
import CardHeader from '@material-ui/core/CardHeader'
import CloseIcon from '@material-ui/icons/Close'
import TimeReleaseButton from './TimeReleaseButton'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { Controller, useForm } from 'react-hook-form'

const CustomerStatusBoard = ({ id, customerList }) => {
  const statuses = ['Open', 'Pending', 'Won', 'Lost'].map(name => {
    const color = getStatusColor(name)
    return {
      name,
      color,
      customerList: customerList.filter(customer => customer.status === name)
    }
  })
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorElMove, setAnchorElMove] = useState(null)
  const [anchorElAmount, setAnchorElAmount] = useState(null)
  const [activeCustomer, setActiveCustomer] = useState(null)
  const [addCustomersDialogOpen, setAddCustomersDialogOpen] = useState(false)
  const [error, setError] = useState()
  const handleClose = () => {
    setAddCustomersDialogOpen(false)
    setError()
  }
  const open = Boolean(anchorEl)
  const openMove = Boolean(anchorElMove)
  const openAmount = Boolean(anchorElAmount)
  const handlePopperClick = (e, customer) => {
    if (e.currentTarget === anchorEl) {
      setAnchorEl(null)
      handlePopperClose()
    } else {
      setAnchorElMove(null)
      setAnchorEl(e.currentTarget)
      setActiveCustomer(customer)
    }
  }
  const handlePopperClose = () => {
    setAnchorEl(null)
    setAnchorElMove(null)
    setAnchorElAmount(null)
  }
  const handleStatusChange = (newStatus) => {
    setAnchorElMove(null)
    updateCustomerProjectStatus({ variables: { id: activeCustomer._id, data: { status: newStatus } } })
  }
  const {
    control: amountChangeControl,
    handleSubmit: amountHandleSubmit,
    reset: amountReset,
    formState: amountFormState
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })
  const { errors: amountChangeErrors, isValid } = amountFormState
  const onSubmit = (data, e) => {
    setAnchorElAmount(null)
    updateCustomerProjectAmount({ variables: { id: activeCustomer._id, data: { amount: data.amount * 10000, note: data.note } } })
  }
  const [deleteCustomerProjectState, { loading: deleteMutationLoading }] = useMutation(DELETE_CUSTOMER_PROJECT_STATE, {
    refetchQueries: [{ query: FIND_PROJECTS_BY_ID, variables: { id } }],
    variables: {
      id: activeCustomer ? activeCustomer._id : null
    },
    onError: (error) => {
      console.log(error)
      setError(error)
    },
    onCompleted: () => handlePopperClose()
  })
  const [addCustomersToProject, { loading: addMutationLoading, error: addMutationError }] = useMutation(ADD_CUSTOMERS_TO_PROJECT, {
    onError: (error) => {
      console.log(error)
      setError(error)
    },
    onCompleted: () => handleClose()
  })
  const [updateCustomerProjectStatus, { loading: updateStatusMutationLoading }] = useMutation(UPDATE_CUSTOMER_PROJECT_STATE, {
    onError: (error) => {
      console.log(error)
      setError(error)
    },
    onCompleted: () => handlePopperClose()
  })
  const [updateCustomerProjectAmount, { loading: updateAmountMutationLoading }] = useMutation(UPDATE_CUSTOMER_PROJECT_STATE, {
    onError: (error) => {
      console.log(error)
      setError(error)
    },
    onCompleted: () => handlePopperClose()
  })
  return (
    <div style={{ overflowX: 'scroll' }}>
      <Typography>{error}</Typography>
      <div style={{ display: 'flex' }}>
        {statuses.map(status => {
          return (
            <Card key={status.name} style={{ minWidth: 270, maxWidth: 270, backgroundColor: status.color, marginRight: status.name === 'Lost' ? 0 : 20 }}>
              <CardContent style={{ padding: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', height: 40 }}>
                  <Typography
                    style={{ color: 'white', flexGrow: 1 }}
                    gutterBottom
                  >
                    {status.name}
                  </Typography>
                  {status.name === 'Open' && (
                    <Tooltip title='Add Customer'>
                      <IconButton aria-label='edit' onClick={() => setAddCustomersDialogOpen(true)}>
                        <GroupAddIcon style={{ color: 'white' }} />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title='Move All'>
                    <IconButton aria-label='edit' onClick={() => setAddCustomersDialogOpen(true)}>
                      <ArrowForwardIcon style={{ color: 'white' }} />
                    </IconButton>
                  </Tooltip>
                </div>
                <div style={{ height: 400, overflow: 'auto' }}>
                  {status.customerList.map(customer => {
                    const formattedAmount = amountShortFormat(customer.amount)
                    return (
                      <Card key={customer.customerRef.account} style={{ marginBottom: 8 }} variant='outlined'>
                        <CardActionArea
                          onClick={(e) => {
                            amountReset({
                              amount: customer.amount / 10000,
                              note: customer.note
                            })
                            handlePopperClick(e, customer)
                          }}
                        >
                          <CardContent style={{ padding: 8 }}>
                            <div style={{ display: 'flex', marginBottom: 4 }}>
                              <Paper elevation={0} style={{ paddingLeft: 4, paddingRight: 4, marginRight: 4, backgroundColor: 'lightgrey' }}>
                                <Typography variant='caption' style={{ fontWeight: 'bold' }}>{customer.customerRef.account}</Typography>
                              </Paper>
                              <Paper elevation={0} style={{ paddingLeft: 4, paddingRight: 4, marginRight: 4, backgroundColor: 'lightgrey', flexGrow: 1 }}>
                                <Typography variant='caption' style={{ fontWeight: 'bold' }}>{customer.customerRef.salesRef.name}</Typography>
                              </Paper>
                              <Paper elevation={0} style={{ paddingLeft: 4, paddingRight: 4, backgroundColor: 'green' }}>
                                <Typography variant='caption' style={{ fontWeight: 'bold', color: 'white' }}>{formattedAmount}</Typography>
                              </Paper>
                            </div>
                            <Typography color='textSecondary' style={{ marginLeft: 4 }}>
                              {customer.customerRef.name}
                            </Typography>
                            {customer.note && (
                              <div style={{ marginLeft: 4 }}>
                                <Typography color='textSecondary' variant='caption'>
                                  {customer.note}
                                </Typography>
                              </div>
                            )}
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <Popper open={open} anchorEl={anchorEl} placement='right-start' transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Grid
              container
              direction='column'
              alignItems={activeCustomer.status === 'Lost' ? 'flex-end' : 'flex-start'}
            >
              {[
                {
                  onClick: (event) => setAnchorElAmount(event.currentTarget === anchorElAmount ? null : event.currentTarget),
                  icon: <EditIcon />,
                  text: 'Edit',
                  pending: updateAmountMutationLoading
                },
                {
                  onClick: (event) => setAnchorElMove(event.currentTarget === anchorElMove ? null : event.currentTarget),
                  icon: <ArrowForwardIcon />,
                  text: 'Move',
                  pending: updateStatusMutationLoading
                },
                {
                  onClick: handlePopperClose,
                  icon: <CancelIcon />,
                  text: 'Cancel',
                  pending: false
                }
              ].map(component => (
                <Grid key={component.text} item style={{ padding: 4, paddingTop: 0 }}>
                  <motion.div whileHover={{ x: activeCustomer.status === 'Lost' ? -6 : 6 }}>
                    <LoadingButton
                      variant='contained'
                      size='small'
                      onClick={(event) => component.onClick(event)}
                      startIcon={component.icon}
                      loadingPosition='start'
                      loading={component.pending}
                    >
                      {component.text}
                    </LoadingButton>
                  </motion.div>
                </Grid>
              ))}
              <Grid item style={{ padding: 4, paddingTop: 0 }}>
                <motion.div whileHover={{ x: activeCustomer.status === 'Lost' ? -6 : 6 }}>
                  <TimeReleaseButton
                    timeReleaseFunction={deleteCustomerProjectState}
                    pending={deleteMutationLoading}
                    buttonText='Delete'
                    icon={<DeleteForeverIcon />}
                  />
                </motion.div>
              </Grid>
            </Grid>
          </Fade>
        )}
      </Popper>
      <Popper open={openMove} anchorEl={anchorElMove} placement='bottom' transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Card>
              <CardContent style={{ padding: 10 }}>
                <CardHeader
                  disableTypography
                  style={{ padding: 0 }}
                  action={
                    <IconButton style={{ marginLeft: 10, marginTop: 0, marginRight: 4 }} aria-label='edit' size='small' onClick={() => setAnchorElMove(null)}>
                      <CloseIcon fontSize='inherit' />
                    </IconButton>
                    }
                  title={
                    <Typography
                      color='textSecondary'
                      gutterBottom
                    >
                      Move to New Status
                    </Typography>
                    }
                />
                <div>
                  {statuses.map(status => (
                    <Tooltip title={status.name} key={status.name}>
                      <Radio
                        checked={activeCustomer.status === status.name}
                        style={{ color: status.color }}
                        onChange={() => handleStatusChange(status.name)}
                        value={status.name}
                        name='radio-button-demo'
                        inputProps={{ 'aria-label': status.name }}
                      />
                    </Tooltip>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Fade>
        )}
      </Popper>
      <Popper open={openAmount} anchorEl={anchorElAmount} placement='bottom' transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <form onSubmit={amountHandleSubmit(onSubmit)}>
              <Card>
                <CardContent style={{ padding: 10 }}>
                  <CardHeader
                    disableTypography
                    style={{ padding: 0 }}
                    action={
                      <IconButton style={{ marginLeft: 10, marginTop: 0, marginRight: 4 }} aria-label='edit' size='small' onClick={() => setAnchorElAmount(null)}>
                        <CloseIcon fontSize='inherit' />
                      </IconButton>
                    }
                    title={
                      <Typography
                        color='textSecondary'
                        gutterBottom
                      >
                        Update Quote Info
                      </Typography>
                    }
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <FormControl error={!!amountChangeErrors.amount} variant='outlined'>
                      <InputLabel required htmlFor='outlined-adornment-amount'>Amount</InputLabel>
                      <Controller
                        name='amount'
                        control={amountChangeControl}
                        rules={{ required: true }}
                        render={({ field }) => {
                          return (
                            <OutlinedInput
                              {...field}
                              autoComplete='off'
                              id='outlined-adornment-amount'
                              startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                              aria-describedby='outlined-adornment-amount'
                              inputProps={{
                                'aria-label': 'amount'
                              }}
                              labelWidth={70}
                              type='number'
                            />
                          )
                        }}
                      />
                      {!!amountChangeErrors.amount && <FormHelperText id='component-error-text'>Amount Cannot Be Blank</FormHelperText>}
                    </FormControl>
                    <Controller
                      name='note'
                      control={amountChangeControl}
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            variant='outlined'
                            name='note'
                            id='note'
                            label='Note'
                            margin='normal'
                            autoComplete='off'
                            error={!!amountChangeErrors.note}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        )
                      }}
                    />
                    <Button variant='contained' type='submit' size='small' style={{ marginTop: 10 }} disableElevation>Save</Button>
                  </div>
                </CardContent>
              </Card>
            </form>

          </Fade>
        )}
      </Popper>
      <AddCustomersDialog
        id={id}
        customerList={customerList}
        dialogOpen={addCustomersDialogOpen}
        setDialogOpen={setAddCustomersDialogOpen}
        addCustomersToProject={addCustomersToProject}
        mutationLoading={addMutationLoading}
        mutationError={addMutationError}
      />
    </div>
  )
}

export default CustomerStatusBoard
