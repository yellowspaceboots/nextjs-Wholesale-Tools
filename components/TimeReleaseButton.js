import React, { useState, useEffect } from 'react'
import LoadingButton from '@material-ui/lab/LoadingButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import useTimer from '../utils/useTimer'

const TimeReleaseButton = ({ timeReleaseFunction, pending, buttonText, icon }) => {
  const [deleteDown, setDeleteDown] = useState(false)
  const { timer, handleStart, handleReset } = useTimer(0)
  useEffect(() => {
    if (timer === 385) {
      timeReleaseFunction(true)
    }
  }, [timer])
  const handleDelete = (direction) => {
    setDeleteDown(direction === 'down')
    if (direction === 'down') {
      handleStart()
    } else {
      handleReset()
    }
  }
  return (
    <LoadingButton
      variant='contained'
      size='small'
      onMouseDown={() => handleDelete('down')}
      onMouseLeave={() => handleDelete('up')}
      onMouseUp={() => handleDelete('up')}
      startIcon={deleteDown ? <CircularProgress size={20} variant='determinate' value={timer} style={{ color: 'red' }} /> : icon}
      pendingPosition='start'
      pending={pending}
    >
      {buttonText}
    </LoadingButton>
  )
}

export default TimeReleaseButton
