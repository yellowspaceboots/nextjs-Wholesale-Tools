import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import TextField from '@material-ui/core/TextField'
import { useTheme } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import customers from '../api/customers.json'
import salesmen from '../api/salesmen.json'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import matchSorter from 'match-sorter'
import { MobileDateTimePicker, MobileDatePicker } from '@material-ui/pickers'
import { useForm, Controller } from 'react-hook-form'
import { DevTool } from 'react-hook-form-devtools'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import ListboxComponent from './VirtualizedList'

const EditProjectDialog = ({ event, dialogOpen, setDialogOpen }) => {
  const formMargin = 14
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const intialState = {
    projectName: event.title,
    amount: event.amount / 10000,
    size: event.size,
    salesman: event.salesman,
    description: event.description,
    customers: [...event.customerList],
    dateEntered: event.dateEntered,
    dateDue: event.dateDue
  }
  const { register, errors, control, handleSubmit } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: intialState
  })
  const insideSalesmen = salesmen.filter(salesman => salesman.type === 'Inside')

  const handleClose = () => {
    setDialogOpen(false)
  }
  const onSubmit = (data, e) => {
    console.log('Initial State', intialState)
    console.log('Data', data)
    console.log(customers)
  }
  const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: [item => item.name] })
  return (
    <>
      <DevTool control={control} />
      <Dialog
        fullScreen={fullScreen}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id='responsive-dialog-title'>Edit Project</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              variant='outlined'
              name='projectName'
              id='project-name'
              label='Name'
              fullWidth
              style={{ marginBottom: formMargin }}
              error={!!errors.projectName}
              helperText={!!errors.projectName && 'Name Cannot Be Blank'}
              inputRef={register({ required: true })}
            />
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
                  renderInput={(params) => <TextField {...params} error={!!errors.customers} helperText={!!errors.customers && 'Customers Cannot Be Blank'} label='Customers' variant='outlined' />}
                  style={{ marginBottom: formMargin }}
                  renderOption={(option, { inputValue }) => {
                    const fullOption = `${option.account}-${option.name}`
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
              control={control}
              defaultValue={intialState.customers}
            />
            <Controller
              as={
                <Autocomplete
                  id='salesmen'
                  options={insideSalesmen}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option.number === value.number}
                  renderInput={(params) => <TextField {...params} error={!!errors.salesmen} helperText={!!errors.salesmen && 'Salesman Cannot Be Blank'} label='Inside Salesman' variant='outlined' />}
                  style={{ marginBottom: formMargin }}
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
              name='salesmen'
              rules={{
                validate: value => {
                  return !!value
                }
              }}
              control={control}
              defaultValue={intialState.salesman}
            />
            <div style={{ display: 'flex' }}>
              <Controller
                as={
                  <MobileDatePicker
                    label='Date Entered'
                    disabled
                    renderInput={props => <TextField {...props} style={{ flex: 1, marginRight: formMargin / 2 }} variant='outlined' />}
                  />
                }
                name='dateEntered'
                rules={{
                  validate: value => {
                    return !!value
                  }
                }}
                control={control}
                defaultValue={intialState.dateEntered}
              />
              <Controller
                as={
                  <MobileDateTimePicker
                    label='Date Due'
                    renderInput={props => <TextField {...props} style={{ flex: 1, marginLeft: formMargin / 2 }} variant='outlined' />}
                  />
                }
                name='dateDue'
                rules={{
                  validate: value => {
                    return !!value
                  }
                }}
                control={control}
                defaultValue={intialState.dateDue}
              />
            </div>
            <FormControl error={!!errors.amount} variant='outlined' fullWidth style={{ marginTop: formMargin, marginBottom: formMargin }}>
              <InputLabel required htmlFor='outlined-adornment-amount'>Amount</InputLabel>
              <Controller
                as={
                  <OutlinedInput
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
                control={control}
                defaultValue={intialState.amount}
              />

              {!!errors.amount && <FormHelperText id='component-error-text'>Amount Cannot Be Blank</FormHelperText>}
            </FormControl>
            <FormControl component='fieldset' fullWidth>
              <FormLabel>Size</FormLabel>
              <Controller
                as={
                  <RadioGroup row aria-label='size'>
                    <FormControlLabel value='Small' control={<Radio />} label='Small' />
                    <FormControlLabel value='Medium' control={<Radio />} label='Medium' />
                    <FormControlLabel value='Large' control={<Radio />} label='Large' />
                  </RadioGroup>
                }
                name='size'
                control={control}
                defaultValue={intialState.size}
              />
            </FormControl>
            <TextField
              id='standard-multiline-static'
              label='Description'
              multiline
              name='description'
              rows={4}
              variant='outlined'
              fullWidth
              style={{ marginTop: formMargin }}
              error={!!errors.description}
              inputRef={register()}
            />
          </DialogContent>
          <DialogActions>
            <Button type='submit' color='primary'>
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

export default EditProjectDialog
