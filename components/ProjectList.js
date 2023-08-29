import React from 'react'
import Grid from '@mui/material/Grid'
import ProjectsByStatus from './ProjectsByStatus'
import { useRouter } from 'next/router'
import { startOfDay, endOfDay } from 'date-fns'

const ProjectList = () => {
  const router = useRouter()
  const status = router.query.status
  const start = router.query?.start ? startOfDay(new Date(router.query.start)).toISOString() : null
  const end = router.query?.end ? endOfDay(new Date(router.query.end)).toISOString() : null
  const fullQuery = {
    start: start,
    end: end,
    inside: router.query?.inside || null,
    outsideSales: router.query?.outside || null,
    account: router.query?.account || null,
    status: status ? status.charAt(0).toUpperCase() + status.substr(1).toLowerCase() : null,
    search: router.query?.search || null
  }
  return (
        <Grid container spacing={3} style={{ marginLeft: 0 }}>
          <Grid item xs={12} style={{ paddingLeft: 0 }} />
          <ProjectsByStatus input={{ ...fullQuery }} />
        </Grid>
  )
}

export default ProjectList
