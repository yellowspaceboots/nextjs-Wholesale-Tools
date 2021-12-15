import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/core/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { Controller, useForm } from 'react-hook-form'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import ListboxComponent from './VirtualizedList'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { DevTool } from '@hookform/devtools'
import Button from '@material-ui/core/Button'
import { useAuth } from './AuthProvider'
import { useDrowDown } from './DropDownProvider'
import DateTimePicker from '@material-ui/lab/DateTimePicker'
import isValid from 'date-fns/isValid'
import format from 'date-fns/format'
import { deepEqual } from '../lib/utils'

const EdiProjectForm = ({ handleClose, updateProject, mutationError, event }) => {
  const { user } = useAuth()
  const initialState = {
    projectName: event.title,
    amount: event.amount / 10000,
    size: event.size,
    status: event.status,
    salesman: event.salesRef,
    description: event.description,
    dateEntered: new Date(event.dateEntered),
    dateDue: new Date(event.dateDue)
  }
  const {
    formState: { errors },
    control,
    handleSubmit,
    watch: editWatch
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initialState
  })
  const onSubmit = (data, e) => {
    const payload = {
      projectId: event._id,
      title: data.projectName.trim(),
      description: data.description.trim(),
      status: data.status,
      dateEdited: new Date().toISOString(),
      dateDue: data.dateDue.toISOString(),
      amount: 0,
      salesman: data.salesman.number,
      size: data.size
    }
    updateProject({ variables: { input: payload } })
  }
  const { salesmen } = useDrowDown()
  const watchAllFields = editWatch()
  const watchDue = editWatch('dateDue')
  const compareWatch = {
    ...watchAllFields,
    dateDue: watchDue ? format(new Date(watchDue), 'MM/dd/yyyy') : null
  }
  const compareInitialState = {
    ...initialState,
    dateDue: initialState.dateDue ? format(new Date(initialState.dateDue), 'MM/dd/yyyy') : null
  }
  const buttonDisabled = deepEqual(compareWatch, compareInitialState)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name='projectName'
              control={control}
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
          <Grid item xs={6}>
            <Controller
              name='salesman'
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <Autocomplete
                    id='insideSalesmen'
                    options={salesmen}
                    value={value}
                    onChange={(e, val) => onChange(val)}
                    disabled={user.role === 'INSIDESALES'}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.number === value.number}
                    renderInput={(params) =>
                      <TextField
                        {...params}
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
              rules={{ validate: value => isValid(value) || value === null }}
              control={control}
              render={props => {
                return (
                  <DateTimePicker
                    {...props.field}
                    label='Date Due'
                    renderInput={(params) => (
                      <TextField {...params} fullWidth variant='outlined' helperText={!!control.dateDue && 'Not a valid Date'} />
                    )}
                  />
                )
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name='size'
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    id='outlined-select-size'
                    {...field}
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
              control={control}
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
                    <MenuItem value='Pending'>
                      Pending
                    </MenuItem>
                    <MenuItem value='Closed'>
                      Closed
                    </MenuItem>
                  </TextField>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='description'
              control={control}
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
        <Button disabled={buttonDisabled} type='submit' color='primary'>
          Save
        </Button>
        <Button onClick={handleClose} type='reset' color='primary' autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </form>
  )
}

export default EdiProjectForm
