import React, { useState } from 'react'
import EventTile from './EventTile'
import Grid from '@material-ui/core/Grid'
import { motion, AnimatePresence } from 'framer-motion'
import Typography from '@material-ui/core/Typography'
import { useProjects } from './ProjectProvider'
import endOfDay from 'date-fns/endOfDay'
import startOfDay from 'date-fns/startOfDay'
import { MobileDateRangePicker, DateRangeDelimiter } from '@material-ui/pickers'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Autocomplete from '@material-ui/core/Autocomplete'
import max from 'date-fns/max'
import min from 'date-fns/min'
import isWithinInterval from 'date-fns/isWithinInterval'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import OpenProjects from './OpenProjects'
import PendingProjects from './PendingProjects'
import ClosedProjects from './ClosedProjects'
import Box from '@material-ui/core/Box'

const ProjectListWrapper = ({ projectList, ...props }) => {
  /*
  const { loading, error, data, resultPath } = useProjects()
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const projectList = data[resultPath].data || []
  */
  return <ProjectList unsorteredProjectList={projectList} {...props} />
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{ display: 'flex', flex: '0 0 100%' }}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  )
}

const ProjectList = ({ unsorteredProjectList, filterOpen }) => {
  const [tabValue, setTabValue] = useState(0)
  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }
  const pageVariants = { initial: { opacity: 0 }, in: { opacity: 1 }, out: { opacity: 0 } }
  /*
  const projectList = unsorteredProjectList.slice().sort((a, b) => new Date(a.dateDue) - new Date(b.dateDue))
  const dateRange = projectList.map(project => new Date(project.dateDue))
  const [selectedDate, handleDateChange] = useState([min(dateRange), max(dateRange)])
  const [customerValue, setCustomerValue] = useState(null)
  const [salesmanValue, setSalesmanValue] = useState(null)
  const [insideSalesmanValue, setInsideSalesmanValue] = useState(null)
  const [projectValue, setProjectValue] = useState(null)
  const pageVariants = { initial: { opacity: 0 }, in: { opacity: 1 }, out: { opacity: 0 } }
  const salesmanAndCustomerList = [].concat(...projectList.map(state => {
    const customerList = state.customerList.data.map(customer => {
      return {
        salesNumber: customer.customerRef.salesRef.number,
        salesName: customer.customerRef.salesRef.name,
        account: customer.customerRef.account,
        customerName: customer.customerRef.name,
        insideSalesNumber: state.salesRef.number,
        insideSalesName: state.salesRef.name
      }
    })
    return customerList
  }))
  const salesmen = salesmanAndCustomerList.reduce((x, y) => x.findIndex(e => e.salesNumber === y.salesNumber) < 0 ? [...x, y] : x, [])
  const insideSalesmen = salesmanAndCustomerList.reduce((x, y) => x.findIndex(e => e.insideSalesNumber === y.insideSalesNumber) < 0 ? [...x, y] : x, [])
  const customers = salesmanAndCustomerList.reduce((x, y) => x.findIndex(e => e.account === y.account) < 0 ? [...x, y] : x, [])
  const projects = projectList.map(project => {
    return { _id: project._id, name: project.title }
  })
  const filteredList = projectList.filter(state =>
    (selectedDate[0] ? isWithinInterval(
      new Date(state.dateDue),
      { start: selectedDate[0], end: selectedDate[1] }
    ) : true) &&
    (customerValue ? state.customerList.data.map(customer => customer.customerRef.account).includes(customerValue.account) : true) &&
    (salesmanValue ? state.customerList.data.map(customer => customer.customerRef.salesRef.number).includes(salesmanValue.salesNumber) : true) &&
    (insideSalesmanValue ? state.salesRef.number === insideSalesmanValue.insideSalesNumber : true) &&
    (projectValue ? state.title === projectValue.name : true))
    */
  return (
    <AnimatePresence>
      <motion.div
        initial='initial'
        animate='in'
        exit='out'
        variants={pageVariants}
      >
        <Grid container spacing={4}>
          {/* filterOpen && (
            <Grid xs={12} item container spacing={2} direction='row'>
              <Grid item>
                <MobileDateRangePicker
                  startText='Start'
                  value={selectedDate}
                  onChange={date => handleDateChange([startOfDay(date[0]), endOfDay(date[1])])}
                  renderInput={(startProps, endProps) => {
                    const myStartProps = {
                      ...startProps,
                      helperText: '',
                      label: 'Date Due From',
                      style: {
                        maxWidth: 150
                      }
                    }
                    const myEndProps = {
                      ...endProps,
                      helperText: '',
                      label: 'Date Due To',
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
                  id='customer'
                  value={customerValue}
                  onChange={(event, newValue) => setCustomerValue(newValue)}
                  options={customers}
                  style={{ minWidth: 200 }}
                  getOptionLabel={(option) => option.customerName}
                  getOptionSelected={(option, value) => option.account === value.account}
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
                  renderInput={(params) => <TextField {...params} label='Salesman' variant='outlined' />}
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  id='insideSalesmen'
                  value={insideSalesmanValue}
                  onChange={(event, newValue) => setInsideSalesmanValue(newValue)}
                  options={insideSalesmen}
                  style={{ minWidth: 200 }}
                  getOptionLabel={(option) => option.insideSalesName}
                  getOptionSelected={(option, value) => option.insideSalesNumber === value.insideSalesNumber}
                  renderInput={(params) => <TextField {...params} label='Inside Salesman' variant='outlined' />}
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  id='projects'
                  value={projectValue}
                  onChange={(event, newValue) => setProjectValue(newValue)}
                  options={projects}
                  style={{ minWidth: 200 }}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option._id === value._id}
                  renderInput={(params) => <TextField {...params} label='Project Name' variant='outlined' />}
                />
              </Grid>
            </Grid>
          ) */}

          <Grid item xs={12}>
            <Divider />
            <Tabs
              value={tabValue}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              centered
              style={{ paddingBottom: 10 }}
            >
              <Tab label='Open' />
              <Tab label='Pending' />
              <Tab label='Closed' />
            </Tabs>
          </Grid>
          <TabPanel value={tabValue} index={0}>
            <OpenProjects />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <PendingProjects />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <ClosedProjects />
          </TabPanel>
          {/* projectList.length > 0 ? (
            <>
              <Grid container spacing={4}>
                {filteredList.map(event =>
                  <EventTile key={event._id} event={event} />
                )}
              </Grid>
            </>
          ) : (
            <>
              <Typography>No Quotations</Typography>
            </>
          ) */}
        </Grid>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectListWrapper
