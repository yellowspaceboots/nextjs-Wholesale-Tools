import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { GET_ALL_OPEN_PROJECTS } from '../testApi/queries/getAllOpenProjects'
import { GET_QUOTATIONS } from '../testApi/queries/getQuotations'
import { useQuery } from '@apollo/client'
import EventTile from './EventTile'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Waypoint } from 'react-waypoint'
import Image from 'next/image'

const ProjectsByStatus = ({ input }) => {
  const { error, data, fetchMore, networkStatus } = useQuery(GET_QUOTATIONS, {
    variables: { cursor: null, input },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first'
  })
  if (networkStatus === 1 || networkStatus === 2) {
    return (
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress color='secondary' size={80} />
      </div>
    )
  }
  if (error) return `Error! ${error.message}`
  const projectList = data?.getQuotations?.data || []
  const wayPointHandler = () => {
    const cursor = data.getQuotations.after
    fetchMore({
      variables: { cursor, input },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newResult = {
          ...fetchMoreResult,
          getQuotations: {
            ...fetchMoreResult.getQuotations,
            data: [...prevResult.getQuotations.data, ...fetchMoreResult.getQuotations.data]
          }
        }
        return newResult
      }
    })
  }
  return (
    <Grid container>
      {projectList.length > 0
        ? (
          <>
            <Grid container spacing={2} style={{ width: '98%', paddingLeft: 20 }}>
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
