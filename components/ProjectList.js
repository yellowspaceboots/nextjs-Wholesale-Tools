import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import { motion, AnimatePresence } from 'framer-motion'
import Divider from '@material-ui/core/Divider'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ProjectsByStatus from './ProjectsByStatus'
import { useRouter } from 'next/router'
import { startOfDay, endOfDay } from 'date-fns'

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

const ProjectList = () => {
  const statusMatrix = {
    open: 0,
    pending: 1,
    closed: 2,
    0: 'open',
    1: 'pending',
    2: 'closed'
  }
  const router = useRouter()
  const status = router.query.status
  const start = router.query?.start ? startOfDay(new Date(router.query.start)).toISOString() : null
  const end = router.query?.end ? endOfDay(new Date(router.query.end)).toISOString() : null
  const fullQuery = useMemo(() => ({
    start: start,
    end: end,
    inside: router.query?.inside || null,
    outsideSales: router.query?.outside || null,
    account: router.query?.account || null
  }))
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
              style={{ paddingBottom: 20 }}
            >
              <Tab label='Open' />
              <Tab label='Pending' />
              <Tab label='Closed' />
            </Tabs>
          </Grid>
          <TabPanel value={tabValue} index={0}>
            <ProjectsByStatus input={{ ...fullQuery, status: 'Open' }} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ProjectsByStatus input={{ ...fullQuery, status: 'Pending' }} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <ProjectsByStatus input={{ ...fullQuery, status: 'Closed' }} />
          </TabPanel>
        </Grid>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectList
