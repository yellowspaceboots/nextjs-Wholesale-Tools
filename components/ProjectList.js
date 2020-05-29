import React from 'react'
import EventTile from './EventTile'
import Grid from '@material-ui/core/Grid'
import { eventData } from '../api/mock'
import { motion, AnimatePresence } from 'framer-motion'

const ProjectList = () => {
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
  return (
    <AnimatePresence>
      <motion.div
        initial='initial'
        animate='in'
        exit='out'
        variants={pageVariants}
      >
        <Grid container spacing={6}>
          {eventData.map(event =>
            <EventTile key={event.id} event={event} />
          )}
        </Grid>
      </motion.div>

    </AnimatePresence>
  )
}

export default ProjectList
