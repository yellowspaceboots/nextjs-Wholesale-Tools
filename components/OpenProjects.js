import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { GET_ALL_OPEN_PROJECTS } from '../testApi/queries/getAllOpenProjects'
import { useQuery } from '@apollo/client'
import EventTile from './EventTile'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Waypoint } from 'react-waypoint'

const OpenProjects = () => {
  const { error, data, fetchMore, networkStatus } = useQuery(GET_ALL_OPEN_PROJECTS, {
    variables: { cursor: null },
    notifyOnNetworkStatusChange: true
  })
  if (networkStatus === 1) {
    return (
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress color='secondary' size={80} />
      </div>
    )
  }
  if (error) return `Error! ${error.message}`
  const projectList = data.getAllOpenProjects.data || []
  const wayPointHandler = () => {
    const cursor = data.getAllOpenProjects.after
    fetchMore({
      variables: { cursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newResult = {
          ...fetchMoreResult,
          getAllOpenProjects: {
            ...fetchMoreResult.getAllOpenProjects,
            data: [...prevResult.getAllOpenProjects.data, ...fetchMoreResult.getAllOpenProjects.data]
          }
        }
        return newResult
      }
    })
  }
  // const projectList = unsorteredProjectList.slice().sort((a, b) => new Date(a.dateDue) - new Date(b.dateDue))
  return (
    <Grid container>
      {projectList.length > 0
        ? (
          <>
            <Grid container spacing={4} style={{ width: '98%', paddingLeft: 20 }}>
              {projectList.map((event, i) =>
                <React.Fragment key={event._id}>
                  <EventTile event={event} />
                  {data.getAllOpenProjects.after && i === projectList.length - 10 && (
                    <Waypoint
                      onEnter={wayPointHandler}
                    />
                  )}
                </React.Fragment>
              )}
            </Grid>
          </>
          )
        : <Typography>No Quotations</Typography>}
      {networkStatus === 3 && (
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress color='secondary' size={80} />
        </div>
      )}
    </Grid>
  )
}

export default OpenProjects
