import React, { useState } from 'react'
import EventTile from './EventTile'
import Grid from '@material-ui/core/Grid'
import { motion, AnimatePresence } from 'framer-motion'
import Typography from '@material-ui/core/Typography'
import endOfDay from 'date-fns/endOfDay'
import startOfDay from 'date-fns/startOfDay'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Autocomplete from '@material-ui/core/Autocomplete'
import max from 'date-fns/max'
import min from 'date-fns/min'
import isWithinInterval from 'date-fns/isWithinInterval'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import ProjectsByStatus from './ProjectsByStatus'

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

const ProjectList = ({ filterOpen }) => {
  const [tabValue, setTabValue] = useState(0)
  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }
  const pageVariants = { initial: { opacity: 0 }, in: { opacity: 1 }, out: { opacity: 0 } }
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
            <ProjectsByStatus statusPage='Open' />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ProjectsByStatus statusPage='Pending' />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <ProjectsByStatus statusPage='Closed' />
          </TabPanel>
        </Grid>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectList
