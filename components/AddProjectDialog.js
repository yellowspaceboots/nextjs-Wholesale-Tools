import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import AddProjectForm from './AddProjectForm'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { CREATE_PROJECT } from '../testApi/mutations/createProject'
import { useMutation } from '@apollo/client'
import { GET_ALL_OPEN_PROJECTS } from '../testApi/queries/getAllOpenProjects'

const AddProjectDialog = ({ dialogOpen, setDialogOpen }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [error, setError] = useState()
  const handleClose = () => {
    setDialogOpen(false)
    setError()
  }
  const [createProject, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_PROJECT, {
    onError: (error) => setError(error),
    refetchQueries: [{ query: GET_ALL_OPEN_PROJECTS }],
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
