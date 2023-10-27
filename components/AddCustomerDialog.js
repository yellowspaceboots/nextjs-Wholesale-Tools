import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AddCustomerForm from './AddCustomerForm'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { ADD_NEW_CUSTOMER } from '../lib/mutations/addNewCustomer'
import { CUSTOMERS_USED_BY_COMMERCIAL_PROJECTS } from '../lib/queries/customersUsedByCommercialProjects'
import { useMutation } from '@apollo/client'

const AddCustomerDialog = ({ dialogOpen, setDialogOpen }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [error, setError] = useState()
  const handleClose = () => {
    setDialogOpen(false)
    setError()
  }
  const [addNewCustomer, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_NEW_CUSTOMER, {
    onError: (error) => setError(error),
    refetchQueries: [{ query: CUSTOMERS_USED_BY_COMMERCIAL_PROJECTS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      handleClose()
    }
  })
  return (
    <>
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
        <DialogTitle id='responsive-dialog-title'>New Customer</DialogTitle>
        <AddCustomerForm handleClose={handleClose} addNewCustomer={addNewCustomer} mutationError={error} />
      </Dialog>
    </>
  )
}

export default AddCustomerDialog
