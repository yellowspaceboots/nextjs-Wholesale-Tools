import React from 'react'
import { getLayout } from '../components/Layout'
import ProjectList from '../components/ProjectList'
import Typography from '@material-ui/core/Typography'

const Projects = () => {
  return (
    <>
      <Typography variant='subtitle1' style={{ margin: 10, marginLeft: 0 }}>Projects</Typography>
      <ProjectList />
    </>
  )
}

Projects.getLayout = getLayout

export default Projects
