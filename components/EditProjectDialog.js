import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import EditProjectForm from './EditProjectForm'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { UPDATE_PROJECT } from '../api/mutations/updateProject'
import { useMutation } from '@apollo/client'

const EditProjectDialog = ({ dialogOpen, setDialogOpen, query, variables, event }) => {
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
        disableBackdropClick={mutationLoading}
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
        <DialogTitle id='responsive-dialog-title'>Edit Project</DialogTitle>
        <EditProjectForm handleClose={handleClose} updateProject={updateProject} mutationError={error} event={event} />
      </Dialog>
    </>
  )
}

export default EditProjectDialog
