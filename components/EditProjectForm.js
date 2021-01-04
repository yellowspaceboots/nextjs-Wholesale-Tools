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

const EdiProjectForm = ({ handleClose, updateProject, mutationError, event }) => {
  const { user } = useAuth()
  const intialState = {
    projectName: event.title,
    amount: event.amount / 10000,
    size: event.size,
    status: event.status,
    salesman: event.salesRef,
    description: event.description,
    dateEntered: new Date(event.dateEntered),
    dateDue: new Date(event.dateDue)
  }
  const { register, errors, control, handleSubmit, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: intialState
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete='off'
              variant='outlined'
              name='projectName'
              id='project-name'
              label='Name'
              fullWidth
              error={!!errors.projectName || mutationError}
              helperText={errors.projectName ? 'Name Cannot Be Blank' : mutationError ? mutationError.message : ''}
              inputRef={register({ required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name='salesman'
              rules={{ validate: value => !!value }}
              control={control}
              defaultValue={intialState.salesman}
              render={({ onChange, ...props }) => {
                return (
                  <Autocomplete
                    id='salesman'
                    {...props}
                    onChange={(e, val) => onChange(val)}
                    disabled={user.role === 'INSIDESALES'}
                    options={salesmen}
                    getOptionLabel={(option) => option.name}
                    getOptionSelected={(option, value) => option.number === value.number}
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
              rules={{ validate: value => isValid(value) }}
              control={control}
              defaultValue={intialState.dateDue}
              render={props => {
                return (
                  <DateTimePicker
                    {...props}
                    label='Date Due'
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant='outlined'
                        helperText={!!errors.dateDue && 'Not a valid Date'}
                      />
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
              defaultValue={intialState.size}
              render={props => {
                return (
                  <TextField
                    id='outlined-select-size'
                    {...props}
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
              defaultValue={intialState.status}
              render={props => {
                return (
                  <TextField
                    id='outlined-select-size'
                    {...props}
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
            <TextField
              id='standard-multiline-static'
              label='Description'
              multiline
              autoComplete='off'
              name='description'
              rows={4}
              variant='outlined'
              fullWidth
              error={!!errors.description}
              inputRef={register()}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button disabled={!formState.isValid} type='submit' color='primary'>
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
