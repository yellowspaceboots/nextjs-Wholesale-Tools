import React, { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  addYears,
  addMonths,
  addDays,
  subYears,
  subMonths,
  subWeeks,
  subDays
} from 'date-fns'
import Grid from '@material-ui/core/Grid'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ToggleButton from '@material-ui/core/ToggleButton'
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup'
import CalendarMonth from './CalendarMonth'
import locale from 'date-fns/locale/en-US'
import CalendarWeek from './CalendarWeek'
import CalendarDay from './CalendarDay'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button'
import DesktopDatePicker from '@material-ui/lab/DatePicker'
import Box from '@material-ui/core/Box'
import { NextLinkComposed } from './Link'

const CommercialCalendar = ({ view, year, month, day }) => {
  const router = useRouter()
  const titleFormats = {
    year: 'yyyy',
    month: 'MMMM yyyy',
    week: 'MMM d',
    week2: 'MMM d yyyy',
    day: 'MMMM d yyyy',
    agenda: 'MMMM yyyy'
  }
  // localize format options: narrow, short, abbreviated, wide
  const weekdays = [...Array(7).keys()].map(i => locale.localize.day(i, { width: 'abbreviated' }))
  const currentDate = new Date()
  const [selectedDate, setSelectedDate] = useState()
  const viewDate = new Date(year, month - 1, day, 0, 0, 0, 0)
  const monthStart = startOfMonth(viewDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)
  const calendarDates = eachDayOfInterval({ start: startDate, end: endDate })
  const getCalendarUrl = (direction) => {
    const myFunctionMap = {
      add: {
        year: addYears,
        month: addMonths,
        week: addWeeks,
        day: addDays,
        agenda: addDays
      },
      subtract: {
        year: subYears,
        month: subMonths,
        week: subWeeks,
        day: subDays,
        agenda: subDays
      }
    }
    const newDate = myFunctionMap[direction][view](viewDate, 1)
    const calendarURL = `/calendar/${view}/${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}`
    return calendarURL
  }
  const todayUrl = `/calendar/${view}/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`
  const nextUrl = getCalendarUrl('add')
  const previousUrl = getCalendarUrl('subtract')
  const handleChange = (event, newView) => newView && router.push('/calendar/[...params]', `/calendar/${newView}/${year}/${month}/${day}`, { shallow: true })

  const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  }
  const MyComponent = {
    month:
  <CalendarMonth
    selectedDate={selectedDate}
    setSelectedDate={setSelectedDate}
    weekdays={weekdays}
    calendarDates={calendarDates}
    monthStart={monthStart}
    currentDate={currentDate}
  />,
    week:
  <CalendarWeek
    currentDate={currentDate}
    viewDate={viewDate}
  />,
    day:
  <CalendarDay
    currentDate={currentDate}
    viewDate={viewDate}
  />
  }
  const title = view !== 'week' ? format(viewDate, titleFormats[view]) : `${format(startOfWeek(viewDate), titleFormats[view])} - ${format(endOfWeek(viewDate), titleFormats.week2)}`
  return (
    <Grid container direction='column'>
      <Grid container item alignItems='center' xs={12} style={{ marginBottom: 6 }}>
        <Button
          variant='outlined'
          to={{ pathname: todayUrl }}
          component={NextLinkComposed}
          style={{ marginRight: 10 }}
        >
          Today
        </Button>
        <IconButton
          to={{ pathname: previousUrl }}
          component={NextLinkComposed}
          color='inherit'
          size='small'
          aria-label='Previous'
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          to={{ pathname: nextUrl }}
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
              router.push(`/calendar/${view}/${newValue.getFullYear()}/${newValue.getMonth() + 1}/${newValue.getDate()}`)
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                <div ref={inputRef} {...inputProps} />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
        </div>
        <ToggleButtonGroup size='small' value={view} exclusive onChange={handleChange}>
          <ToggleButton key={2} value='month'>
            Month
          </ToggleButton>
          <ToggleButton key={3} value='week'>
            Week
          </ToggleButton>
          <ToggleButton key={4} value='day'>
            Day
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <div style={{ height: '100%', maxWidth: '100%', overflowX: 'scroll' }}>
        <AnimatePresence exitBeforeEnter key={[view, viewDate]}>
          <motion.div
            initial='initial'
            animate='in'
            exit='out'
            variants={pageVariants}
          >
            {MyComponent[view]}
          </motion.div>
        </AnimatePresence>
      </div>
    </Grid>
  )
}

export default CommercialCalendar
