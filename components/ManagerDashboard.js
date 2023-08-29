import React from 'react'
import Grid from '@mui/material/Grid'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { NextLinkComposed } from './Link'
import Button from '@mui/material/Button'
import DesktopDatePicker from '@mui/lab/DatePicker'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'
import Analytics from './Analytics'

const ManagerDashboard = ({
  viewDate,
  nextViewDate,
  previousViewDate,
  title,
  data,
  loading,
  error,
  start,
  end
}) => {
  const router = useRouter()
  if (error) return `Error! ${error.message}`
  return (
    <>
  <Grid container direction='column'>
      <Grid container item alignItems='center' xs={12} style={{ marginBottom: 6 }}>
        <Button
          variant='outlined'
          to={{ pathname: '/' }}
          component={NextLinkComposed}
          style={{ marginRight: 10 }}
        >
          Today
        </Button>
        <IconButton
          to={{ pathname: '/', query: { year: previousViewDate.getFullYear(), month: previousViewDate.getMonth() + 1, day: previousViewDate.getDate(), selector: 1 } }}
          component={NextLinkComposed}
          color='inherit'
          size='small'
          aria-label='Previous'
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          to={{ pathname: '/', query: { year: nextViewDate.getFullYear(), month: nextViewDate.getMonth() + 1, day: nextViewDate.getDate(), selector: 1 } }}
          component={NextLinkComposed}
          color='inherit'
          size='small'
          aria-label='Previous'
        >
          <ChevronRightIcon />
        </IconButton>
        <Typography variant='h5' style={{ marginLeft: 15, flexGrow: 1 }}>{title}</Typography>
        <div style={{ marginRight: 8 }}>
          <DesktopDatePicker
            value={viewDate}
            onChange={(newValue) => {
              router.push({ pathname: '/', query: { year: newValue.getFullYear(), month: newValue.getMonth() + 1, day: newValue.getDate(), selector: 1 } })
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                <div ref={inputRef} {...inputProps} />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
        </div>
      </Grid>
    </Grid>
    {loading ? (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    ) : <Analytics data={data} start={start} end={end} />
    }
    </>

  )
}

export default ManagerDashboard
