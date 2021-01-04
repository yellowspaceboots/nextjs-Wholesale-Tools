import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery, useMutation } from '@apollo/client'
import { FIND_CUSTOMERS_BY_ID } from '../testApi/queries/findCustomersById'
import { useForm } from 'react-hook-form'
import LoadingButton from '@material-ui/lab/LoadingButton'
import { CHANGE_CUSTOMER_SALESMAN } from '../testApi/mutations/changeCustomerSalesman'

const Customer = ({ id }) => {
  const {
    register: newSalesRegister,
    errors: newSalesErrors,
    handleSubmit: newSalesHandleSubmit,
    formState: newSalesFormState,
    reset: newSalesReset
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })
  const [myError, setMyError] = useState()
  const [changeCustomerSalesman, { loading: mutationLoading, error: mutationError }] = useMutation(CHANGE_CUSTOMER_SALESMAN, {
    onError: (error) => console.log(error),
    onCompleted: () => {
      newSalesReset()
    }
  })
  const onSubmit = (data, e) => changeCustomerSalesman({ variables: { input: { id, salesmanNumber: data.newSalesNumber.toUpperCase() } } })
  const { loading, error, data } = useQuery(FIND_CUSTOMERS_BY_ID, { variables: { id } })
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const pageVariants = { initial: { opacity: 0 }, in: { opacity: 1 }, out: { opacity: 0 } }
  const customerObj = data.findCustomersByID
  return (
    <AnimatePresence>
      <>
        <motion.div
          initial='initial'
          animate='in'
          exit='out'
          variants={pageVariants}
        >
          <Grid container alignItems='center' direction='column'>
            <Typography variant='h6'>{customerObj.account} - {customerObj.name}</Typography>
            <Typography>{customerObj.salesRef.name} - {customerObj.salesRef.number}</Typography>
            <form onSubmit={newSalesHandleSubmit(onSubmit)}>
              <Grid container alignItems='center' direction='column'>
                <TextField
                  id='standard-multiline-static'
                  label='New Sales Number'
                  autoComplete='off'
                  name='newSalesNumber'
                  inputProps={{
                    maxLength: 4,
                    style: {
                      textTransform: 'uppercase'
                    }
                  }}
                  variant='outlined'
                  helperText='Must be 4 Characters'
                  error={!!newSalesErrors.salesman}
                  inputRef={newSalesRegister({
                    required: true,
                    maxLength: 4,
                    minLength: 4,
                    validate: value => value.toLowerCase().trim() !== customerObj.salesRef.number.toLowerCase().trim()
                  })}
                  style={{ marginTop: 30, marginBottom: 12 }}
                />
                <LoadingButton disabled={!newSalesFormState.isValid} type='submit' color='primary' pending={mutationLoading} variant='outlined'>
                  Save
                </LoadingButton>
              </Grid>
            </form>
          </Grid>
        </motion.div>
      </>
    </AnimatePresence>
  )
}

export default Customer
