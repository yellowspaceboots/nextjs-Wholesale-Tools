import React from 'react'
import EventTile from './EventTile'
import Grid from '@material-ui/core/Grid'
import { motion, AnimatePresence } from 'framer-motion'
import Typography from '@material-ui/core/Typography'
import { useProjects } from './ProjectProvider'

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
  const { loading, error, data, refetch, resultPath } = useProjects()
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const projectList = data[resultPath].data || []
  return (
    <AnimatePresence>
      <motion.div
        initial='initial'
        animate='in'
        exit='out'
        variants={pageVariants}
      >
        {projectList.length > 0 ? (
          <>
            <Grid container spacing={6}>
              {projectList.map(event =>
                <EventTile key={event._id} event={event} />
              )}
            </Grid>
          </>
        ) : (
          <>
            <Typography>No Active Projects</Typography>
          </>
        )}

      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectList
