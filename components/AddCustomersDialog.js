import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Autocomplete from '@mui/material/Autocomplete'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ListboxComponent from './VirtualizedList'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { Controller, useForm } from 'react-hook-form'
import { matchSorter } from 'match-sorter'
import { useDrowDown } from './DropDownProvider'

const AddCustomersDialog = ({
  dialogOpen,
  setDialogOpen,
  id,
  customerList,
  addCustomersToProject,
  mutationLoading,
  mutationError
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: [item => item.name] })
  const [error, setError] = useState()
  const handleClose = () => {
    setDialogOpen(false)
    setError()
  }
  const currentCustomerList = customerList.map(customer => customer.customerRef.account)
  const initialState = {
    customers: []
  }
  const {
    control: addCustomersControl,
    handleSubmit: addCustomersHandleSubmit,
    formState: addCustomersFormState
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initialState
  })
  const { errors, isValid } = addCustomersFormState
  const onSubmit = (data, e) => {
    const payload = {
      projectId: id,
      customerList: data.customers.map(customer => {
        return {
          account: customer.account,
          name: customer.name
        }
      })
    }
    addCustomersToProject({ variables: { input: payload } })
  }
  const { customers } = useDrowDown()
  return (
    <Dialog
      fullScreen={fullScreen}
      open={dialogOpen}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
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
      <form onSubmit={addCustomersHandleSubmit(onSubmit)}>
        <DialogContent style={{ width: 500 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name='customers'
                control={addCustomersControl}
                defaultValue={initialState.customers}
                rules={{ validate: value => value.length > 0 }}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <Autocomplete
                      id='customers'
                      multiple
                      onChange={(e, val) => onChange(val)}
                      options={customers}
                      filterOptions={filterOptions}
                      fullWidth
                      isOptionEqualToValue={(option, value) => option.account === value.account}
                      getOptionDisabled={option => currentCustomerList.includes(option.account)}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) =>
                        <TextField
                          {...params}
                          error={!!errors.customers}
                          helperText={!!errors.customers && 'Customers Cannot Be Blank'}
                          label='Customers'
                          variant='outlined'
                        />}
                      ListboxComponent={ListboxComponent}
                      renderOption={(props, option, { inputValue }) => {
                        const fullOption = `${option.account} - ${option.name} - ${option.salesRef.number}`
                        const matches = match(fullOption.trim(), inputValue)
                        const parts = parse(fullOption.trim(), matches)
                        return (
                          <li {...props}>
                            {parts.map((part, index) => (
                              <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                {part.text}
                              </span>
                            ))}
                          </li>
                        )
                      }}
                    />
                  )
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={!isValid} type='submit' color='primary'>
            Save
          </Button>
          <Button onClick={handleClose} type='reset' color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddCustomersDialog
