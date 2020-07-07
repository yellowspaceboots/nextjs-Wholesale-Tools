import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { ADD_CUSTOMERS_TO_PROJECT } from '../testApi/mutations/addCustomersToProject'
import { useMutation } from '@apollo/client'
import customers from '../testApi/houstonCustomers.json'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ListboxComponent from './VirtualizedList'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { Controller, useForm } from 'react-hook-form'
import matchSorter from 'match-sorter'

const AddCustomersDialog = ({ dialogOpen, setDialogOpen, query, variables, event }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: [item => item.name] })
  const [error, setError] = useState()
  const handleClose = () => {
    setDialogOpen(false)
    setError()
  }
  const currentCustomerList = event.customerList.data.map(customer => customer.customerRef.account)
  const intialState = {
    customers: []
  }
  const {
    register: addCustomerRegister,
    errors: addCustomerErrors,
    control: addCustomerControl,
    handleSubmit: addCustomerHandleSubmit,
    formState: addCustomerFormState
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: intialState
  })
  const [addCustomersToProject, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_CUSTOMERS_TO_PROJECT, {
    onError: (error) => {
      console.log(error)
      setError(error)
    },
    onCompleted: () => {
      handleClose()
    }
  })
  const onSubmit = (data, e) => {
    const payload = {
      projectId: event._id,
      customerList: data.customers.map(customer => {
        return {
          account: customer.account,
          name: customer.name
        }
      })
    }
    addCustomersToProject({ variables: { input: payload } })
  }
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
        disableBackdropClick={mutationLoading}
      >
        {mutationLoading &&
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
            <Typography style={{ color: 'white' }}>Adding Customer...</Typography>
            {mutationError && <p>Error :( Please try again</p>}
          </div>}
        <DialogTitle id='responsive-dialog-title'>Add Customer</DialogTitle>
        <form onSubmit={addCustomerHandleSubmit(onSubmit)}>
          <DialogContent style={{ width: 500 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  as={
                    <Autocomplete
                      id='customers'
                      multiple
                      options={customers}
                      filterOptions={filterOptions}
                      fullWidth
                      getOptionSelected={(option, value) => option.account === value.account}
                      getOptionDisabled={option => currentCustomerList.includes(option.account)}
                      getOptionLabel={(option) => option.name}
                      ListboxComponent={ListboxComponent}
                      renderInput={(params) => <TextField {...params} error={!!addCustomerErrors.customers} helperText={!!addCustomerErrors.customers && 'Customers Cannot Be Blank'} label='Customers' variant='outlined' />}
                      renderOption={(option, { inputValue }) => {
                        const fullOption = `${option.salesmanNumber}-${option.account}-${option.name}`
                        const matches = match(fullOption.trim(), inputValue)
                        const parts = parse(fullOption.trim(), matches)
                        return (
                          <div>
                            {parts.map((part, index) => (
                              <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                {part.text}
                              </span>
                            ))}
                          </div>
                        )
                      }}
                    />
                  }
                  onChange={([, data]) => data}
                  name='customers'
                  rules={{
                    validate: value => {
                      return value.length > 0
                    }
                  }}
                  control={addCustomerControl}
                  defaultValue={intialState.customers}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button disabled={!addCustomerFormState.isValid} type='submit' color='primary'>
            Save
            </Button>
            <Button onClick={handleClose} color='primary' autoFocus>
            Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default AddCustomersDialog
