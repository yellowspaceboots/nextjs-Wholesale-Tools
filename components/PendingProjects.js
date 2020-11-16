import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { GET_ALL_PENDING_PROJECTS } from '../testApi/queries/getAllPendingProjects'
import { useQuery } from '@apollo/client'
import EventTile from './EventTile'
import CircularProgress from '@material-ui/core/CircularProgress'

const PendingProjects = () => {
  const { loading, error, data } = useQuery(GET_ALL_PENDING_PROJECTS)
  if (loading) {
    return (
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress color='secondary' size={80} />
      </div>
    )
  }
  if (error) return `Error! ${error.message}`
  const unsorteredProjectList = data.getAllPendingProjects.data || []
  const projectList = unsorteredProjectList.slice().sort((a, b) => new Date(a.dateDue) - new Date(b.dateDue))
  return (
    <>
      {projectList.length > 0
        ? (
          <>
            <Grid container spacing={4} style={{ width: '98%', paddingLeft: 20 }}>
              {projectList.map(event =>
                <EventTile key={event._id} event={event} />
              )}
            </Grid>
          </>
          )
        : (
          <>
            <Typography>No Quotations</Typography>
          </>
          )}
    </>
  )
}

export default PendingProjects
