import React from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_ALL_FILES } from '../api/queries/getAllFiles'
import { getLayout } from '../components/Layout'

const IndexPage = () => {
  const [getAllFiles, { loading, data: allFilesData, error: allFilesError }] = useLazyQuery(GET_ALL_FILES)
  return (
    <>
      <button onClick={() => getAllFiles()}>Get All Files</button>
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
