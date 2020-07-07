import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import FormControl from '@material-ui/core/FormControl'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import matchSorter from 'match-sorter'
import { MobileDateTimePicker, MobileDatePicker } from '@material-ui/pickers'
import { Controller, useForm } from 'react-hook-form'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import ListboxComponent from './VirtualizedList'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { DevTool } from 'react-hook-form-devtools'
import Button from '@material-ui/core/Button'
import customers from '../testApi/houstonCustomers.json'
import salesmen from '../testApi/salesmen.json'

const AddProjectForm = ({ handleClose, createProject, mutationError }) => {
  const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: [item => item.name] })
  const intialState = {
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
    register: addRegister,
    errors: addErrors,
    control: addControl,
    handleSubmit: addHandleSubmit,
    formState: addFormState
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: intialState
  })
  const onSubmit = (data, e) => {
    const payload = {
      title: data.projectName.trim(),
      description: data.description.trim(),
      status: data.status,
      dateEntered: data.dateEntered.toISOString(),
      dateDue: data.dateDue.toISOString(),
      amount: data.amount * 10000,
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
  const insideSalesmen = salesmen.filter(salesman => salesman.type === 'Inside')
  return (
    <form onSubmit={addHandleSubmit(onSubmit)}>
      <DevTool control={addControl} />
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
              error={!!addErrors.projectName || mutationError}
              helperText={addErrors.projectName ? 'Name Cannot Be Blank' : mutationError ? mutationError.message : ''}
              inputRef={addRegister({ required: true })}
            />
          </Grid>
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
                  getOptionLabel={(option) => option.name}
                  ListboxComponent={ListboxComponent}
                  renderInput={(params) => <TextField {...params} error={!!addErrors.customers} helperText={!!addErrors.customers && 'Customers Cannot Be Blank'} label='Customers' variant='outlined' />}
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
              control={addControl}
              defaultValue={intialState.customers}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={
                <Autocomplete
                  id='salesman'
                  options={insideSalesmen}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option.number === value.number}
                  renderInput={(params) =>
                    <TextField
                      {...params}
                      error={!!addErrors.salesman}
                      helperText={!!addErrors.salesman && 'Salesman Cannot Be Blank'}
                      label='Inside Salesman'
                      variant='outlined'
                    />}
                  ListboxComponent={ListboxComponent}
                  renderOption={(option, { inputValue }) => {
                    const fullOption = `${option.number}-${option.name}`
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
              name='salesman'
              rules={{
                validate: value => {
                  return !!value
                }
              }}
              control={addControl}
              defaultValue={intialState.salesman}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              as={
                <MobileDatePicker
                  label='Date Entered'
                  disabled
                  renderInput={props => <TextField {...props} fullWidth variant='outlined' />}
                />
              }
              name='dateEntered'
              rules={{
                validate: value => {
                  return !!value
                }
              }}
              control={addControl}
              defaultValue={intialState.dateEntered}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              as={
                <MobileDateTimePicker
                  label='Date Due'
                  renderInput={props => <TextField {...props} fullWidth variant='outlined' />}
                />
              }
              name='dateDue'
              rules={{
                validate: value => {
                  return !!value
                }
              }}
              control={addControl}
              defaultValue={intialState.dateDue}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl error={!!addErrors.amount} variant='outlined' fullWidth>
              <InputLabel required htmlFor='outlined-adornment-amount'>Amount</InputLabel>
              <Controller
                as={
                  <OutlinedInput
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
                }
                name='amount'
                control={addControl}
                defaultValue={intialState.amount}
              />

              {!!addErrors.amount && <FormHelperText id='component-error-text'>Amount Cannot Be Blank</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Controller
              as={
                <TextField
                  id='outlined-select-size'
                  select
                  fullWidth
                  label='Size'
                  variant='outlined'
                  error={!!addErrors.size}
                  helperText={!!addErrors.size && 'Size Cannot Be Blank'}
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
              }
              name='size'
              control={addControl}
              defaultValue={intialState.size}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              as={
                <TextField
                  id='outlined-select-size'
                  select
                  fullWidth
                  label='Status'
                  variant='outlined'
                  error={!!addErrors.status}
                  helperText={!!addErrors.status && 'Status Cannot Be Blank'}
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
              }
              name='status'
              control={addControl}
              defaultValue={intialState.status}
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
              error={!!addErrors.description}
              inputRef={addRegister()}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button disabled={!addFormState.isValid} type='submit' color='primary'>
            Save
        </Button>
        <Button onClick={handleClose} color='primary' autoFocus>
            Cancel
        </Button>
      </DialogActions>
    </form>
  )
}

export default AddProjectForm
