import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Controller, useForm } from 'react-hook-form'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const AddCustomerForm = ({ handleClose, addNewCustomer, mutationError }) => {
  const initialState = {
    customerName: '',
    salesmanNumber: '',
    store: '0072',
    account: '',
    assignable: true
  }
  const {
    register: addCustomerRegister,
    control: addCustomerControl,
    handleSubmit: addCustomerHandleSubmit,
    formState: addCustomerFormState
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initialState
  })
  const { errors, isValid } = addCustomerFormState
  const onSubmit = (data, e) => {
    const payload = {
      name: data.customerName.trim(),
      salesmanNumber: data.salesmanNumber.trim().toUpperCase(),
      account: data.account,
      storeNumber: data.store,
      usedByCommercial: data.assignable
    }
    addNewCustomer({ variables: { input: payload } })
  }
  return (
    <form onSubmit={addCustomerHandleSubmit(onSubmit)}>
      <DialogContent style={{ width: 400 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name='customerName'
              control={addCustomerControl}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    autoComplete='off'
                    variant='outlined'
                    name='customerName'
                    id='customer-name'
                    label='Name'
                    fullWidth
                    error={!!errors.customerName || mutationError}
                    helperText={errors.customerName ? 'Name Cannot Be Blank' : mutationError ? mutationError.message : ''}
                  />
                )
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name='salesmanNumber'
              control={addCustomerControl}
              rules={{
                required: true,
                maxLength: 4,
                minLength: 4
              }}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    autoComplete='off'
                    variant='outlined'
                    name='salesmanNumber'
                    id='salesman-number'
                    label='Salesman Number'
                    inputProps={{
                      maxLength: 4,
                      style: {
                        textTransform: 'uppercase'
                      }
                    }}
                    fullWidth
                    error={!!errors.salesmanNumber || mutationError}
                    helperText='Must be 4 Characters'
                  />
                )
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name='account'
              control={addCustomerControl}
              rules={{
                required: true,
                maxLength: 7,
                minLength: 7,
                validate: value => [...value].every(c => '0123456789'.includes(c))
              }}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    autoComplete='off'
                    variant='outlined'
                    name='account'
                    id='account-number'
                    label='Account Number'
                    inputProps={{ maxLength: 7 }}
                    fullWidth
                    error={!!errors.account || mutationError}
                    helperText='Must be 7 Numbers'
                  />
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='store'
              control={addCustomerControl}
              defaultValue={initialState.store}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    id='outlined-select-size'
                    select
                    fullWidth
                    label='Store'
                    variant='outlined'
                    error={!!errors.store}
                    helperText={!!errors.store && 'Store Cannot Be Blank'}
                  >
                    <MenuItem value='0054'>0054- CMMS BAYTOWN</MenuItem>
                    <MenuItem value='0058'>0058- ANNISTON</MenuItem>
                    <MenuItem value='0060'>0060- CMMS PT ARTHUR</MenuItem>
                    <MenuItem value='0061'>0061- CABLE STORE</MenuItem>
                    <MenuItem value='0062'>0062- WHOLESALE R & M JV</MenuItem>
                    <MenuItem value='0063'>0063- WAYNESBORO</MenuItem>
                    <MenuItem value='0064'>0064- SHELL FRANKLIN</MenuItem>
                    <MenuItem value='0065'>0065- CMMS CORPUS CHRISTI</MenuItem>
                    <MenuItem value='0066'>0066- CMMS</MenuItem>
                    <MenuItem value='0067'>0067- C B & I PERU</MenuItem>
                    <MenuItem value='0068'>0068- BEAUMONT</MenuItem>
                    <MenuItem value='0070'>0070- DEER PARK</MenuItem>
                    <MenuItem value='0071'>0071- CLUTE</MenuItem>
                    <MenuItem value='0072'>0072- HOUSTON</MenuItem>
                    <MenuItem value='0073'>0073- NEW ORLEANS</MenuItem>
                    <MenuItem value='0074'>0074- SULPHUR</MenuItem>
                    <MenuItem value='0075'>0075- BATON ROUGE</MenuItem>
                    <MenuItem value='0076'>0076- EXXON BATON ROUGE</MenuItem>
                    <MenuItem value='0077'>0077- TEXAS CITY</MenuItem>
                    <MenuItem value='0078'>0078- WASHINGTON</MenuItem>
                    <MenuItem value='0079'>0079- VICTORIA</MenuItem>
                    <MenuItem value='0080'>0080- LAFAYETTE</MenuItem>
                    <MenuItem value='0081'>0081- PASCAGOULA</MenuItem>
                    <MenuItem value='0082'>0082- NORTHWEST HOUSTON</MenuItem>
                    <MenuItem value='0084'>0084- CMMS LOUISIANA</MenuItem>
                    <MenuItem value='0085'>0085- CORPORATE</MenuItem>
                    <MenuItem value='0092'>0092- CONROE</MenuItem>
                    <MenuItem value='0093'>0093- JOLIET</MenuItem>
                    <MenuItem value='0094'>0094- MIDLAND-ODESSA</MenuItem>
                    <MenuItem value='0101'>0101- WES SHOP</MenuItem>
                    <MenuItem value='6631'>6631- EECOL PROJECT</MenuItem>
                    <MenuItem value='6640'>6640- GORGON PROJECT</MenuItem>
                    <MenuItem value='6801'>6801- EXXON CHEM BEAUMONT</MenuItem>
                    <MenuItem value='6802'>6802- EXXON REFINERY BEAUM</MenuItem>
                    <MenuItem value='7001'>7001- EXXON WOODLAND CAMPU</MenuItem>
                  </TextField>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={addCustomerControl}
              name='assignable'
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                    />
                  }
                  label='Assignable'
                  labelPlacement='start'
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button disabled={!isValid} type='submit' color='primary'>
          Save
        </Button>
        <Button onClick={handleClose} type='reset' color='primary' autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </form>
  )
}

export default AddCustomerForm
