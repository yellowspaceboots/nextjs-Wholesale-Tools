import React from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_ACTIVE_PROJECTS } from '../api/queries/getActiveProjects'
import { getLayout } from '../components/Layout'

const IndexPage = () => {
  const [getActiveProjects, { loading, data: allFilesData, error: allFilesError }] = useLazyQuery(GET_ACTIVE_PROJECTS)
  return (
    <>
      <button onClick={() => getActiveProjects()}>Get All Files</button>
      <br />
      File Data
      <pre>
        {loading ? (
          <div>loading...</div>
        ) : allFilesError ? (
          JSON.stringify(allFilesError, null, 2)
        ) : (
          JSON.stringify(allFilesData, null, 2)
        )}
      </pre>
    </>
  )
}

IndexPage.getLayout = getLayout

export default IndexPage
