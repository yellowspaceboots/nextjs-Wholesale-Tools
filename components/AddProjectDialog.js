import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AddProjectForm from './AddProjectForm'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { CREATE_PROJECTV10 } from '../lib/mutations/createProject'
import { useMutation } from '@apollo/client'
import { GET_QUOTATIONSV10 } from '../lib/queries/getQuotations'

const AddProjectDialog = ({ dialogOpen, setDialogOpen }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [error, setError] = useState()
  const handleClose = () => {
    setDialogOpen(false)
    setError()
  }
  const [createProject, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_PROJECTV10, {
    onError: (error) => setError(error),
    refetchQueries: [{ query: GET_QUOTATIONSV10, variables: { input: { status: "Open" }} }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      handleClose()
    }
  })
  return (
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
          <Typography style={{ color: 'white' }}>Creating Quotation...</Typography>
          {mutationError && <p>Error :( Please try again</p>}
        </div>}
      <DialogTitle id='responsive-dialog-title'>New Quotation</DialogTitle>
      <AddProjectForm handleClose={handleClose} createProject={createProject} mutationError={error} />
    </Dialog>
  )
}

export default AddProjectDialog
