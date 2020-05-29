import React, { useState } from 'react'
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

const AddProjectDialog = ({ dialogOpen, setDialogOpen }) => {
  const formMargin = 14
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const intialState = {
    projectName: '',
    amount: '',
    size: '',
    salesman: '',
    description: '',
    customers: [],
    dateEntered: new Date(),
    dateDue: new Date()
  }
  const [values, setValues] = useState(intialState)
  const insideSalesmen = salesmen.filter(salesman => salesman.type === 'Inside')

  const handleClose = () => {
    setDialogOpen(false)
    setValues(intialState)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: [item => item.name] })
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>Add Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant='outlined'
            name='projectName'
            id='project-name'
            label='Name'
            fullWidth
            onChange={handleInputChange}
            value={values.ProjectName}
            style={{ marginBottom: formMargin }}
          />
          <Autocomplete
            id='customers'
            multiple
            options={customers}
            filterOptions={filterOptions}
            fullWidth
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label='Customers' variant='outlined' />}
            style={{ marginBottom: formMargin }}
            onChange={(event, newValue) => {
              setValues({ ...values, customers: newValue })
            }}
            renderOption={(option, { inputValue }) => {
              const matches = match(option.name.trim(), inputValue)
              const parts = parse(option.name.trim(), matches)
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
          <Autocomplete
            id='salesmen'
            options={insideSalesmen}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label='Inside Salesman' variant='outlined' />}
            style={{ marginBottom: formMargin }}
            onChange={(event, newValue) => {
              setValues({ ...values, salesman: newValue })
            }}
          />
          <div style={{ display: 'flex' }}>
            <MobileDatePicker
              renderInput={props => <TextField {...props} style={{ flex: 1, marginRight: formMargin / 2 }} variant='outlined' label='Date Entered' />}
              clearable
              label='Date Entered'
              value={values.dateEntered}
              onChange={date => setValues({ ...values, dateEntered: date })}
              inputFormat='MM/dd/yyyy'
            />
            <MobileDateTimePicker
              value={values.dateDue}
              label='Date Due'
              onChange={date => setValues({ ...values, dateDue: date })}
              renderInput={props => <TextField style={{ flex: 1, marginLeft: formMargin / 2 }} variant='outlined' label='Date Due' {...props} />}
            />
          </div>
          <TextField
            autoFocus
            variant='outlined'
            name='amount'
            id='amount'
            label='Amount'
            fullWidth
            onChange={handleInputChange}
            value={values.ProjectAmount}
            style={{ marginBottom: formMargin, marginTop: formMargin }}
          />
          <FormControl component='fieldset' fullWidth>
            <FormLabel component='legend'>Size</FormLabel>
            <RadioGroup row aria-label='size' name='size' value={values.ProjectSize} onChange={handleInputChange}>
              <FormControlLabel value='small' control={<Radio />} label='Small' />
              <FormControlLabel value='medium' control={<Radio />} label='Medium' />
              <FormControlLabel value='large' control={<Radio />} label='Large' />
            </RadioGroup>
          </FormControl>
          <TextField
            id='standard-multiline-static'
            label='Description'
            multiline
            name='description'
            rows={4}
            variant='outlined'
            fullWidth
            onChange={handleInputChange}
            value={values.description}
            style={{ marginTop: formMargin }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => console.log(values)} color='primary'>
            Submit
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddProjectDialog
