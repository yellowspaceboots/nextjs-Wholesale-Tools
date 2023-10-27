import React from 'react'
import Grid from '@mui/material/Grid'
import { GET_QUOTATIONS } from '../lib/queries/getQuotations'
import { useQuery } from '@apollo/client'
import EventTile from './EventTile2'
import CircularProgress from '@mui/material/CircularProgress'
import { Waypoint } from 'react-waypoint'
import Image from 'next/image'
import Box from '@mui/material/Box'

const ProjectsByStatus = ({ input }) => {
  const { error, data, fetchMore, networkStatus } = useQuery(GET_QUOTATIONS, {
    variables: { cursor: null, input },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first'
  })
  if (networkStatus === 1 || networkStatus === 2) {
    return (
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
        <CircularProgress color='secondary' size={80} />
      </Box>
    )
  }
  if (error) return `Error! ${error.message}`
  const projectList = data?.getQuotations?.data || []
  const wayPointHandler = () => {
    const cursor = data.getQuotations.after
    fetchMore({
      variables: { cursor, input }
    })
  }
  return (
    <Grid container alignItems='center'>
      {projectList.length > 0
        ? (
          <>
            <Grid container item spacing={1} alignItems='stretch' sx={{ flexShrink: 1, mt: 1 }}>
              {projectList.map((event, i) =>
                <React.Fragment key={event._id}>
                  <EventTile event={event} />
                  {data.getQuotations.after && i === projectList.length - 10 && (
                    <Waypoint
                      onEnter={wayPointHandler}
                    />
                  )}
                </React.Fragment>
              )}
            </Grid>
          </>
          )
        : (
          <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              src='/NoResults.png'
              alt='Picture of the author'
              width={500}
              height={500}
            />
          </div>
          )}
      {networkStatus === 3 && (
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress color='secondary' size={80} />
        </div>
      )}
    </Grid>
  )
}

export default React.memo(ProjectsByStatus)
