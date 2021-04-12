import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import FormControl from '@material-ui/core/FormControl'
import { getStatusColor } from '../lib/utils'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import SaveIcon from '@material-ui/icons/Save'
import Tooltip from '@material-ui/core/Tooltip'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useTheme } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { UPDATE_CUSTOMER_PROJECT_STATE } from '../lib/mutations/updateCustomerProjectState'
import { DELETE_CUSTOMER_PROJECT_STATE } from '../lib/mutations/deleteCustomerProjectState'
import { useMutation } from '@apollo/client'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { FIND_PROJECTS_BY_ID } from '../lib/queries/findProjectsById'

const CustomerCard = ({ customer, fullAmount, id, customerCount }) => {
  const theme = useTheme()
  const [edit, setEdit] = useState(false)
  const [open, setOpen] = useState(false)
  const [statusColor, setStatusColor] = useState(getStatusColor(customer.status))
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const customerFullAmount = customer.amount / 10000 || fullAmount / 10000
  const intialState = {
    amount: customerFullAmount,
    status: customer.status
  }
  const { register, errors, control, handleSubmit, formState, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: intialState
  })
  const [updateCustomerProjectState, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_CUSTOMER_PROJECT_STATE, {
    onCompleted: () => setEdit(false)
  })
  const [deleteCustomerProjectState, { loading: deleteMutationLoading, error: deleteMutationError }] = useMutation(DELETE_CUSTOMER_PROJECT_STATE, {
    refetchQueries: [{ query: FIND_PROJECTS_BY_ID, variables: { id } }],
    awaitRefetchQueries: true,
    variables: {
      id: customer._id
    }
  })
  const onSubmit = (data, e) => {
    const payload = {
      status: data.status,
      amount: data.amount * 10000
    }
    updateCustomerProjectState({ variables: { id: customer._id, data: payload } })
    setStatusColor(getStatusColor(data.status))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card variant='outlined' style={{ position: 'relative', height: '100%', borderColor: statusColor }}>
        {(mutationLoading || deleteMutationLoading) &&
          <div
            style={{
              zIndex: theme.zIndex.tooltip + 1,
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              width: '100%',
              background: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <CircularProgress style={{ color: 'white' }} />
            <Typography style={{ color: 'white' }}>{mutationLoading ? 'Saving...' : 'Removing...'}</Typography>
          </div>}
        <CardContent style={{ paddingBottom: 0, display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ width: '100%', flexGrow: 1 }}>
                <Typography color='textSecondary' style={{ fontSize: 14 }}>
                  Account: {customer.customerRef.account}
                </Typography>
                <Typography color='textSecondary' style={{ fontSize: 14 }}>
                  {customer.customerRef.salesRef.name}
                </Typography>
              </div>
            </div>
            <Typography variant='h6' style={{ fontWeight: 'lighter' }} gutterBottom>
              {customer.customerRef.name}
            </Typography>
            <Controller
              name='status'
              control={control}
              defaultValue={intialState.status}
              render={props => {
                return (
                  <TextField
                    select
                    {...props}
                    disabled={!edit}
                    size='small'
                    label='Status'
                    variant='outlined'
                    style={{ marginBottom: 12 }}
                  >
                    <MenuItem value='Open'>
                      Open
                    </MenuItem>
                    <MenuItem value='Pending'>
                      Pending
                    </MenuItem>
                    <MenuItem value='Won'>
                      Won
                    </MenuItem>
                    <MenuItem value='Lost'>
                      Lost
                    </MenuItem>
                  </TextField>
                )
              }}
            />
            <div>
              <FormControl error={!!errors.amount} variant='outlined' size='small' fullWidth style={{ marginBottom: 10 }}>
                <InputLabel htmlFor={`outlined-adornment-amount${customer._id}`}>Amount</InputLabel>
                <Controller
                  name='amount'
                  control={control}
                  defaultValue={intialState.amount}
                  render={props => {
                    return (
                      <OutlinedInput
                        {...props}
                        autoComplete='off'
                        disabled={!edit}
                        id={`outlined-adornment-amount${customer._id}`}
                        startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                        aria-describedby={`outlined-adornment-amount${customer._id}`}
                        inputProps={{
                          'aria-label': 'amount'
                        }}
                        labelWidth={70}
                        type='number'
                      />
                    )
                  }}
                />
              </FormControl>
            </div>
          </div>
          <div style={{ marginLeft: 6, marginRight: -8 }}>
            {!edit
              ? (
                <div>
                  <Tooltip title='Edit Customer' placement='right'>
                    <IconButton aria-label='Edit' onClick={() => setEdit(!edit)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                )
              : (
                <>
                  <div>
                    <Tooltip title='Cancel' placement='right'>
                      <IconButton
                        aria-label='Delete'
                        onClick={() => {
                          reset(intialState)
                          setEdit(!edit)
                        }}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title='Save Changes' placement='right'>
                      <IconButton
                        type='submit'
                        aria-label='Save'
                      >
                        <SaveIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  {customerCount > 1 && (
                    <div>
                      <Tooltip title='Remove Customer' placement='right'>
                        <IconButton
                          aria-label='remove'
                          onClick={handleClickOpen}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  )}
                </>
                )}
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Removing the customer from this job will result in loss of status information and cannot be undone. You can add the customer back to this job at anytime with a new status.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose()
              deleteCustomerProjectState()
            }}
            color='primary'
            autoFocus
          >
            Remove
          </Button>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default CustomerCard
