import React, { useMemo } from 'react'
import Grid from '@mui/material/Grid'
import { motion, AnimatePresence } from 'framer-motion'
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
  const pageVariants = { initial: { opacity: 0 }, in: { opacity: 1 }, out: { opacity: 0 } }
  return (
    <AnimatePresence>
      <motion.div
        initial='initial'
        animate='in'
        exit='out'
        variants={pageVariants}
      >
        <Grid container spacing={3} style={{ marginLeft: 0 }}>
          <Grid item xs={12} style={{ paddingLeft: 0 }} />
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
