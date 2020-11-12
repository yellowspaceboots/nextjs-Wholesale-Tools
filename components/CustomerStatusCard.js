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
import { getStatusColor, amountShortFormat } from '../testApi/utils'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import SaveIcon from '@material-ui/icons/Save'
import Tooltip from '@material-ui/core/Tooltip'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useTheme } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { UPDATE_CUSTOMER_PROJECT_STATE } from '../testApi/mutations/updateCustomerProjectState'
import { DELETE_CUSTOMER_PROJECT_STATE } from '../testApi/mutations/deleteCustomerProjectState'
import { useMutation } from '@apollo/client'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { FIND_PROJECTS_BY_ID } from '../testApi/queries/findProjectsById'
import Paper from '@material-ui/core/Paper'
import { CardActionArea } from '@material-ui/core'
import EditCustomerDialog from './EditCustomerDialog'
import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const CustomerStatusCard = ({ customer, handlePopperClick }) => {
  const formattedAmount = amountShortFormat(customer.amount)
  const theme = useTheme()
  const [edit, setEdit] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  /*
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
    setDialogOpen(!dialogOpen)
  };
 // const [statusColor, setStatusColor] = useState(getStatusColor(customer.status))
  /* const customerFullAmount = customer.amount / 10000 || fullAmount / 10000
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
  */
  return (
    <Card style={{ marginBottom: 8 }} variant='outlined'>
      <CardActionArea onClick={handlePopperClick(customer)}>
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
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CustomerStatusCard
