import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/core/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { matchSorter } from 'match-sorter'
import { Controller, useForm } from 'react-hook-form'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import ListboxComponent from './VirtualizedList'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { DevTool } from '@hookform/devtools'
import Button from '@material-ui/core/Button'
import { useDrowDown } from './DropDownProvider'
import DesktopDatePicker from '@material-ui/lab/DatePicker'
import isValid from 'date-fns/isValid'

const AddProjectForm = ({ handleClose, createProject, mutationError }) => {
  const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: [item => item.name] })
  const initialState = {
    projectName: '',
    amount: '',
    size: '',
    status: '',
    salesman: null,
    description: '',
    customers: [],
    dateEntered: new Date(),
    dateDue: new Date()
  }
  const {
    control: addControl,
    handleSubmit: addHandleSubmit,
    formState: addFormState
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initialState
  })
  const { errors, isValid: isValidState } = addFormState
  const onSubmit = (data, e) => {
    const payload = {
      title: data.projectName.trim(),
      description: data.description.trim(),
      status: data.status,
      dateEntered: new Date().toISOString(),
      dateDue: data.dateDue.toISOString(),
      amount: 0,
      salesman: data.salesman.number,
      customerList: data.customers.map(customer => {
        return {
          account: customer.account,
          name: customer.name
        }
      }),
      size: data.size
    }
    createProject({ variables: { input: payload } })
  }
  const { salesmen, customers } = useDrowDown()
  return (
    <form onSubmit={addHandleSubmit(onSubmit)}>
      <DevTool control={addControl} />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name='projectName'
              control={addControl}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    autoComplete='off'
                    variant='outlined'
                    label='Name'
                    fullWidth
                    error={!!errors.projectName || mutationError}
                    helperText={errors.projectName ? 'Name Cannot Be Blank' : mutationError ? mutationError.message : ''}
                  />
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='customers'
              control={addControl}
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
                    getOptionLabel={(option) => option.name}
                    ListboxComponent={ListboxComponent}
                    renderInput={(params) =>
                      <TextField
                        {...params}
                        error={!!errors.customers}
                        helperText={!!errors.customers && 'Customers Cannot Be Blank'}
                        label='Customers'
                        variant='outlined'
                      />}
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
          <Grid item xs={6}>
            <Controller
              name='salesman'
              control={addControl}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <Autocomplete
                    id='salesman'
                    options={salesmen}
                    onChange={(e, val) => onChange(val)}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.number === value.number}
                    renderInput={(params) =>
                      <TextField
                        {...params}
                        error={!!errors.salesman}
                        helperText={!!errors.salesman && 'Assigned To Cannot Be Blank'}
                        label='Assigned To'
                        variant='outlined'
                      />}
                    ListboxComponent={ListboxComponent}
                    renderOption={(props, option, { inputValue }) => {
                      const fullOption = `${option.number}-${option.name}`
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
          <Grid item xs={6}>
            <Controller
              name='dateDue'
              rules={{ validate: value => isValid(value), required: true }}
              control={addControl}
              render={({ field }) => {
                return (
                  <DesktopDatePicker
                    {...field}
                    label='Date Due'
                    renderInput={(params) => (
                      <TextField {...params} fullWidth variant='outlined' helperText={!!addControl.dateDue && 'Not a valid Date'} />
                    )}
                  />
                )
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name='size'
              control={addControl}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    id='outlined-select-size'
                    select
                    fullWidth
                    label='Size'
                    variant='outlined'
                    error={!!errors.size}
                    helperText={!!errors.size && 'Size Cannot Be Blank'}
                  >
                    <MenuItem value='Small'>
                      Small
                    </MenuItem>
                    <MenuItem value='Medium'>
                      Medium
                    </MenuItem>
                    <MenuItem value='Large'>
                      Large
                    </MenuItem>
                  </TextField>
                )
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name='status'
              control={addControl}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextField
                    id='outlined-select-size'
                    {...field}
                    select
                    fullWidth
                    label='Status'
                    variant='outlined'
                    error={!!errors.status}
                    helperText={!!errors.status && 'Status Cannot Be Blank'}
                  >
                    <MenuItem value='On Track'>
                      On Track
                    </MenuItem>
                    <MenuItem value='At Risk'>
                      At Risk
                    </MenuItem>
                    <MenuItem value='Off Track'>
                      Off Track
                    </MenuItem>
                  </TextField>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='description'
              control={addControl}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    id='standard-multiline-static'
                    label='Description'
                    multiline
                    autoComplete='off'
                    name='description'
                    rows={4}
                    variant='outlined'
                    fullWidth
                    error={!!errors.description}
                  />
                )
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button disabled={!isValidState} type='submit' color='primary'>
          Save
        </Button>
        <Button onClick={handleClose} type='reset' color='primary' autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </form>
  )
}

export default AddProjectForm
