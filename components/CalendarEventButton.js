import React from 'react'
import { format } from 'date-fns'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import InternalLink from './InternalLink'
import { green, red } from '@material-ui/core/colors'

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
            href='/quotations/[id]'
            as={`/quotations/${event._id}`}
            component={InternalLink}
            onClick={(e) => e.stopPropagation()}
            variant='contained'
            classes={{
              root: classes.root,
              label: classes.label
            }}
          >
            {buttonText}
          </Button>
          )
        : (
          <Button
            {...props}
            href='/quotations/[id]'
            as={`/quotations/${event._id}`}
            component={InternalLink}
            color={selectedButton.color}
            onClick={(e) => e.stopPropagation()}
            variant='contained'
            classes={{
              root: classes.unThemedRoot,
              label: classes.label
            }}
          >
            {buttonText}
          </Button>
          )}
    </>
  )
}

export default CalendarEventButton
