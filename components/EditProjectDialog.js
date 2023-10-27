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

const EditProjectDialog = ({ dialogOpen, setDialogOpen, event }) => {
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
            <Typography style={{ color: 'white' }}>Updating Quotation...</Typography>
            {mutationError && <p>Error :( Please try again</p>}
          </div>}
        <DialogTitle id='responsive-dialog-title'>Edit Quotation</DialogTitle>
        <EditProjectForm handleClose={handleClose} updateProject={updateProject} mutationError={error} event={event} />
      </Dialog>
    </>
  )
}

export default EditProjectDialog
