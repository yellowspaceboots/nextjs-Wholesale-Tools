import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/core/Autocomplete'
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
import { DevTool } from '@hookform/devtools'
import Button from '@material-ui/core/Button'
import { useDrowDown } from './DropDownProvider'

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
  // const insideSalesmen = salesmen.filter(salesman => salesman.type === 'Inside')
  const { salesmen, customers } = useDrowDown()
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
              name='customers'
              control={addControl}
              defaultValue={intialState.customers}
              rules={{ validate: value => value.length > 0 }}
              render={({ onChange, onBlur, value }) => {
                return (
                  <Autocomplete
                    id='customers'
                    multiple
                    onChange={(e, val) => onChange(val)}
                    options={customers}
                    filterOptions={filterOptions}
                    fullWidth
                    getOptionSelected={(option, value) => option.account === value.account}
                    getOptionLabel={(option) => option.name}
                    ListboxComponent={ListboxComponent}
                    renderInput={(params) =>
                      <TextField
                        {...params}
                        error={!!addErrors.customers}
                        helperText={!!addErrors.customers && 'Customers Cannot Be Blank'}
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
          <Grid item xs={12}>
            <Controller
              name='salesman'
              control={addControl}
              defaultValue={intialState.salesman}
              rules={{ validate: value => !!value }}
              render={({ onChange, onBlur, value }) => {
                return (
                  <Autocomplete
                    id='salesman'
                    options={salesmen}
                    onChange={(e, val) => onChange(val)}
                    getOptionLabel={(option) => option.name}
                    getOptionSelected={(option, value) => option.number === value.number}
                    renderInput={(params) =>
                      <TextField
                        {...params}
                        error={!!addErrors.salesman}
                        helperText={!!addErrors.salesman && 'Assigned To Cannot Be Blank'}
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
              name='dateEntered'
              rules={{ validate: value => !!value }}
              control={addControl}
              defaultValue={intialState.dateEntered}
              render={({ onChange, onBlur, value }) => {
                return (
                  <MobileDatePicker
                    label='Date Entered'
                    disabled
                    renderInput={props => <TextField {...props} fullWidth variant='outlined' />}
                  />
                )
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name='dateDue'
              rules={{ validate: value => !!value }}
              control={addControl}
              defaultValue={intialState.dateDue}
              render={props => {
                return (
                  <MobileDateTimePicker
                    {...props}
                    label='Date Due'
                    renderInput={props => <TextField {...props} fullWidth variant='outlined' />}
                  />
                )
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl error={!!addErrors.amount} variant='outlined' fullWidth>
              <InputLabel required htmlFor='outlined-adornment-amount'>Amount</InputLabel>
              <Controller
                name='amount'
                control={addControl}
                defaultValue={intialState.amount}
                render={props => {
                  return (
                    <OutlinedInput
                      {...props}
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
              {!!addErrors.amount && <FormHelperText id='component-error-text'>Amount Cannot Be Blank</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Controller
              name='size'
              control={addControl}
              defaultValue={intialState.size}
              render={props => {
                return (
                  <TextField
                    {...props}
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
                )
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name='status'
              control={addControl}
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
        <Button onClick={handleClose} type='reset' color='primary' autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </form>
  )
}

export default AddProjectForm
