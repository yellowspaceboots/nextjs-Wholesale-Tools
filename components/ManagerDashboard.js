import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ACTIVE_CUSTOMER_STATE } from '../api/queries/activeCustomerState'
import { groupBy } from '../api/utils'
import CustomerReportCard from './CustomerReportCard'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import { MobileDateRangePicker, DateRangeDelimiter } from '@material-ui/pickers'
import max from 'date-fns/max'
import min from 'date-fns/min'
import isWithinInterval from 'date-fns/isWithinInterval'
import endOfDay from 'date-fns/endOfDay'
import startOfDay from 'date-fns/startOfDay'
import { useTheme } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'

const ManagerDashboard = () => {
  const theme = useTheme()
  const [selectedDate, handleDateChange] = useState([null, null])
  const [letterValue, setValue] = useState(['A', 'B', 'C', 'D', 'F'])
  const [customerValue, setCustomerValue] = useState(null)
  const [salesmanValue, setSalesmanValue] = useState(null)
  const { loading, error, data } = useQuery(ACTIVE_CUSTOMER_STATE, {
    onCompleted: data => {
      const dateRange = data.activeCustomerState.data.map(state => new Date(state.projectRef.dateEntered))
      const maxDate = max(dateRange)
      const minDate = min(dateRange)
      handleDateChange([minDate, maxDate])
    }
  })
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const salesmanAndCustomerList = data.activeCustomerState.data.map(state => {
    return {
      salesNumber: state.customerRef.salesRef.number,
      salesName: state.customerRef.salesRef.name,
      account: state.customerRef.account,
      customerName: state.customerRef.name
    }
  })
  const salesmen = salesmanAndCustomerList.reduce((x, y) => x.findIndex(e => e.salesNumber === y.salesNumber) < 0 ? [...x, y] : x, [])
  const customers = salesmanAndCustomerList.reduce((x, y) => x.findIndex(e => e.account === y.account) < 0 ? [...x, y] : x, [])
  const groupedProjectStates = groupBy(data.activeCustomerState.data.filter(state => selectedDate[0] ? isWithinInterval(
    new Date(state.projectRef.dateEntered),
    { start: selectedDate[0], end: selectedDate[1] }
  ) : true).map(state => {
    return {
      _id: state._id,
      status: state.status,
      projectId: state.projectRef._id,
      dateEntered: new Date(state.projectRef.dateEntered),
      customerId: state.customerRef._id,
      account: state.customerRef.account,
      customerName: state.customerRef.name,
      salesNumber: state.customerRef.salesRef.number,
      salesName: state.customerRef.salesRef.name
    }
  }), 'account')
  const final = Object.keys(groupedProjectStates).map(account => {
    const customer = groupedProjectStates[account]
    const percentageGrade = (customer.filter(state => (state.status === 'Won' || state.status === 'Lost')).length) === 0
      ? 10
      : customer.filter(state => state.status === 'Won').length / (customer.filter(state => (state.status === 'Won' || state.status === 'Lost')).length)
    const counts = {
      open: customer.filter(state => (state.status === 'Open' || state.status === 'Pending')).length,
      won: customer.filter(state => state.status === 'Won').length,
      lost: customer.filter(state => state.status === 'Lost').length,
      total: customer.length
    }
    const getLetterGrade = (percentage) => {
      switch (true) {
        case percentage === 1000:
          return { letter: 'N', color: theme.palette.text.secondary }
        case percentage > 90:
          return { letter: 'A', color: theme.palette.success.main }
        case percentage > 80:
          return { letter: 'B', color: theme.palette.success.main }
        case percentage > 70:
          return { letter: 'C', color: theme.palette.secondary.main }
        case percentage > 64:
          return { letter: 'D', color: theme.palette.error.dark }
        case percentage < 64:
          return { letter: 'F', color: theme.palette.error.dark }
        default:
          return { letter: 'N', color: theme.palette.text.secondary }
      }
    }
    const letterGrade = getLetterGrade(percentageGrade * 100)
    return {
      account,
      customerArr: groupedProjectStates[account],
      percentageGrade,
      counts,
      letterGrade,
      customerName: customer[0].customerName,
      salesName: customer[0].salesName,
      salesNumber: customer[0].salesNumber
    }
  }).filter(state => (letterValue.includes(state.letterGrade.letter) || letterValue.length === 0) && (customerValue === null || state.account === customerValue.account) && (salesmanValue === null || state.salesNumber === salesmanValue.salesNumber))
  const filteredCustomerList = final.map(state => state.account)
  const filtereSalesmanList = final.map(state => state.salesName)
  console.log(customerValue)
  return (
    <Grid container spacing={2}>
      <Grid xs={12} item container style={{ marginTop: 12 }} spacing={2} direction='row'>
        <Grid item>
          <MobileDateRangePicker
            startText='Start'
            value={selectedDate}
            onChange={date => handleDateChange([startOfDay(date[0]), endOfDay(date[1])])}
            renderInput={(startProps, endProps) => {
              const myStartProps = {
                ...startProps,
                helperText: '',
                label: 'Date Entered From',
                style: {
                  maxWidth: 150
                }
              }
              const myEndProps = {
                ...endProps,
                helperText: '',
                label: 'Date Entered To',
                style: {
                  maxWidth: 150
                }
              }
              return (
                <>
                  <TextField {...myStartProps} />
                  <DateRangeDelimiter> to </DateRangeDelimiter>
                  <TextField {...myEndProps} />
                </>
              )
            }}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id='letters'
            value={letterValue}
            onChange={(event, newValue) => setValue(newValue)}
            multiple
            options={['A', 'B', 'C', 'D', 'F', 'N']}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label='Letter' variant='outlined' />}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id='customer'
            value={customerValue}
            onChange={(event, newValue) => setCustomerValue(newValue)}
            options={customers}
            style={{ minWidth: 200 }}
            getOptionLabel={(option) => option.customerName}
            getOptionSelected={(option, value) => option.account === value.account}
            getOptionDisabled={option => !filteredCustomerList.includes(option.account)}
            renderInput={(params) => <TextField {...params} label='Customer' variant='outlined' />}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id='salesmen'
            value={salesmanValue}
            onChange={(event, newValue) => setSalesmanValue(newValue)}
            options={salesmen}
            style={{ minWidth: 200 }}
            getOptionLabel={(option) => option.salesName}
            getOptionSelected={(option, value) => option.salesNumber === value.salesNumber}
            getOptionDisabled={option => !filtereSalesmanList.includes(option.salesName)}
            renderInput={(params) => <TextField {...params} label='Salesman' variant='outlined' />}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {final.map(customer => {
        return (
          <Grid item key={customer.account}>
            <CustomerReportCard customer={customer} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ManagerDashboard
