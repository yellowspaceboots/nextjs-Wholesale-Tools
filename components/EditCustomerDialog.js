/*
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import EditProjectForm from './EditProjectForm'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { UPDATE_PROJECT } from '../lib/mutations/updateProject'
import { useMutation } from '@apollo/client'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

const EditCustomerDialog = ({ dialogOpen, setDialogOpen, customer }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [error, setError] = useState()
  const handleClose = () => {
    setDialogOpen(false)
    setError()
  }
  const [updateProject, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_PROJECT, {
    onError: (error) => setError(error),
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
            <Typography style={{ color: 'white' }}>Updating Project...</Typography>
            {mutationError && <p>Error :( Please try again</p>}
          </div>}
        <DialogTitle id='responsive-dialog-title'>Edit Project Customer</DialogTitle>
        <Typography>{customer.customerRef.name}</Typography>
        <DialogActions>
          <Button type='submit' color='primary'>
            Save
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditCustomerDialog
*/
