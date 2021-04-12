import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import AddSalesmanForm from './AddSalesmanForm'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { CREATE_SALESMEN } from '../lib/mutations/createSalesmen'
import { SALESMEN_USED_BY_COMMERCIAL_PROJECTS } from '../lib/queries/salesmenUsedByCommercialProjects'
import { useMutation } from '@apollo/client'

const AddSalesmanDialog = ({ dialogOpen, setDialogOpen }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [error, setError] = useState()
  const handleClose = () => {
    setDialogOpen(false)
    setError()
  }
  const [createSalesmen, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_SALESMEN, {
    onError: (error) => setError(error),
    refetchQueries: [{ query: SALESMEN_USED_BY_COMMERCIAL_PROJECTS }],
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
          <Typography style={{ color: 'white' }}>Adding Salesman...</Typography>
          {mutationError && <p>Error :( Please try again</p>}
        </div>}
      <DialogTitle id='responsive-dialog-title'>New Salesman</DialogTitle>
      <AddSalesmanForm handleClose={handleClose} createSalesmen={createSalesmen} mutationError={error} />
    </Dialog>
  )
}

export default AddSalesmanDialog
