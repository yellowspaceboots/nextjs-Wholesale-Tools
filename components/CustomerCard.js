import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import { getStatusColor } from '../api/utils'
import CustomerDialog from './CustomerDialog'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'
import Tooltip from '@material-ui/core/Tooltip'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useTheme } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'

/*
          <Chip
            label={customer.status}
            variant='outlined'
            style={{
              height: 28,
              color: statusColor,
              borderColor: statusColor
            }}
            avatar={
              <Avatar
                style={{
                  backgroundColor: statusColor,
                  color: statusColor,
                  height: 20,
                  width: 20
                }}
              />
            }
          />
*/

const CustomerCard = ({ customer, fullAmount }) => {
  const theme = useTheme()
  const [edit, setEdit] = useState(false)
  const [saving, setSaving] = useState(false)
  const statusColor = getStatusColor(customer.status)
  const customerFullAmount = customer.fullAmount || fullAmount
  const intialState = {
    amount: customerFullAmount,
    status: customer.status
  }
  const { register, errors, control, handleSubmit, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: intialState
  })
  return (
    <>
      <Card variant='outlined' style={{ position: 'relative', height: '100%', borderColor: (customer.status === 'Won' && 'green') || (customer.status === 'Lost' && 'red') }}>
        {saving &&
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
            <Typography style={{ color: 'white' }}>Saving...</Typography>
          </div>}
        <CardContent style={{ paddingBottom: 0 }}>
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ width: '100%', flexGrow: 1 }}>
              <Typography color='textSecondary' style={{ fontSize: 14 }}>
                Account: {customer.account}
              </Typography>
              <Typography color='textSecondary' style={{ fontSize: 14 }}>
                {customer.salesman.name}
              </Typography>
            </div>
            <div>
              {!edit ? (
                <Tooltip title='Edit'>
                  <IconButton size='small' aria-label='Edit' style={{ marginLeft: 10 }} onClick={() => setEdit(!edit)}>
                    <EditIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              ) : (
                <div style={{ display: 'flex' }}>
                  <Tooltip title='Save Changes'>
                    <IconButton
                      size='small'
                      aria-label='Delete'
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        setSaving(true)
                        setTimeout(() => {
                          setEdit(false)
                          setSaving(false)
                        }, 3000)
                      }}
                    >
                      <SaveIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Cancel'>
                    <IconButton size='small' aria-label='Delete' style={{ marginLeft: 10 }} onClick={() => setEdit(!edit)}>
                      <CancelIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
          <Typography variant='h6' style={{ fontWeight: 'lighter' }} gutterBottom>
            {customer.name}
          </Typography>
          <Controller
            as={
              <TextField
                select
                disabled={!edit}
                size='small'
                label='Status'
                variant='outlined'
                value={customer.status}
                style={{ marginBottom: 12 }}
              >
                <MenuItem value='Open'>
                    Open
                </MenuItem>
                <MenuItem value='Pending'>
                    Pending
                </MenuItem>
                <MenuItem value='Won'>
                    Won
                </MenuItem>
                <MenuItem value='Lost'>
                    Lost
                </MenuItem>
              </TextField>
            }
            name='status'
            control={control}
            defaultValue={intialState.status}
          />
          <div>
            <TextField
              disabled={!edit}
              size='small'
              name='amount'
              label='Quote Amount'
              variant='outlined'
              style={{ marginBottom: 12 }}
              inputRef={register({ required: true })}
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default CustomerCard
