import React from 'react'
import { format } from 'date-fns'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import { green, red } from '@mui/material/colors'
import { NextLinkComposed } from './Link'

const useStyles = makeStyles(theme => ({
  root: props => ({
    fontSize: 12,
    height: props.wrap ? 'auto' : 18,
    overflow: 'hidden',
    marginBottom: 4,
    marginRight: 4,
    color: props.selectedButton.textColor,
    backgroundColor: props.selectedButton.color,
    '&:hover': {
      backgroundColor: props.selectedButton.hover
    },
    '.MuiButton-label': {
      justifyContent: 'flex-start',
      whiteSpace: props.wrap ? 'wrap' : 'nowrap',
      textOverflow: 'ellipsis'
    }
  }),
  unThemedRoot: props => ({
    fontSize: 12,
    height: props.wrap ? 'auto' : 18,
    overflow: 'hidden',
    marginBottom: 4,
    marginRight: 4
  }),
  label: props => ({
    justifyContent: 'flex-start',
    whiteSpace: props.wrap ? 'wrap' : 'nowrap',
    textOverflow: 'ellipsis'
  })
}))

const CalendarEventButton = ({ event, time, title, salesman, wrap, ...props }) => {
  const buttonSelector = {
    'On Track': {
      themeButton: true,
      color: green[700],
      hover: green[900],
      textColor: 'white'
    },
    'At Risk': {
      themeButton: false,
      color: 'secondary',
      hover: 'secondary',
      textColor: 'secondary'
    },
    Pending: {
      themeButton: false,
      color: 'secondary',
      hover: 'secondary',
      textColor: 'secondary'
    },
    'Off Track': {
      themeButton: true,
      color: red[700],
      hover: red[900],
      textColor: 'white'
    },
    Closed: {
      themeButton: false,
      color: 'inherit',
      hover: 'inherit',
      textColor: 'inherit'
    }
  }
  const selectedButton = event.status ? buttonSelector[event.status] : buttonSelector.Closed
  const timeText = time ? `${format(new Date(event.dateDue), 'ha').toLowerCase()} ` : ''
  const titleText = title ? `${event.title} ` : ''
  const salesmanText = salesman ? `- ${event.salesRef.name}` : ''
  const buttonText = timeText + titleText + salesmanText
  const classes = useStyles({ selectedButton, wrap })
  return (
    <>
      {selectedButton.themeButton
        ? (
          <Button
            {...props}
            to={{ pathname: `/quotations/${event._id}` }}
            component={NextLinkComposed}
            onClick={(e) => e.stopPropagation()}
            variant='contained'
            sx={{
              fontSize: 12,
              height: wrap ? 'auto' : 18,
              overflow: 'hidden',
              marginBottom: '4px',
              marginRight: '4px',
              color: selectedButton.textColor,
              backgroundColor: selectedButton.color,
              '&:hover': {
                backgroundColor: selectedButton.hover
              },
              justifyContent: 'flex-start',
              whiteSpace: wrap ? 'wrap' : 'nowrap'
            }}
          >
            {buttonText}
          </Button>
          )
        : (
          <Button
            {...props}
            to={{ pathname: `/quotations/${event._id}` }}
            component={NextLinkComposed}
            color={selectedButton.color}
            onClick={(e) => e.stopPropagation()}
            variant='contained'
            sx={{
              fontSize: 12,
              height: wrap ? 'auto' : 18,
              overflow: 'hidden',
              marginBottom: '4px',
              marginRight: '4px',
              justifyContent: 'flex-start',
              whiteSpace: wrap ? 'wrap' : 'nowrap'
            }}
          >
            {buttonText}
          </Button>
          )}
    </>
  )
}

export default CalendarEventButton
