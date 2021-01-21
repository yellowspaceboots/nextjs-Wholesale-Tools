import React from 'react'
import Grid from '@material-ui/core/Grid'
import { motion, AnimatePresence } from 'framer-motion'
import Divider from '@material-ui/core/Divider'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ProjectsByStatus from './ProjectsByStatus'
import { useRouter } from 'next/router'

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

const ProjectList = ({ filterOpen, status }) => {
  const statusMatrix = {
    open: 0,
    pending: 1,
    closed: 2,
    0: 'open',
    1: 'pending',
    2: 'closed'
  }
  const router = useRouter()

  const tabValue = statusMatrix[status]
  const handleChange = (event, newValue) => {
    const query = {
      ...router.query,
      status: statusMatrix[newValue]
    }
    router.push({
      pathname: '/quotations',
      query
    })
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
