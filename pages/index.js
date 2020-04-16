import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import cookie from 'cookie'
import { withApollo } from '../api/apollo'
import LoginForm from '../components/LoginForm'
import { GET_ALL_FILES } from '../api/queries/getAllFiles'
import Layout from '../components/Layout'

const IndexPage = ({ token }) => {
  const [loginError, setLoginError] = useState(null)
  const [loginData, setLoginData] = useState(token)
  const [getAllFiles, { loading, data: allFilesData, error: allFilesError }] = useLazyQuery(GET_ALL_FILES)
  return (
    <Layout
      setLoginError={setLoginError}
      setLoginData={setLoginData}
    >
      <LoginForm
        setLoginError={setLoginError}
        setLoginData={setLoginData}
        getAllFiles={getAllFiles}
      />
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
      Login Data
      <pre>
        {loginError
          ? JSON.stringify(loginError, null, 2)
          : JSON.stringify(loginData, null, 2)}
      </pre>
    </Layout>
  )
}

IndexPage.getInitialProps = async ctx => {
  if (typeof window === 'undefined') {
    const { req, res } = ctx
    const cookies = cookie.parse(req.headers.cookie || '')

    if (!cookies) {
      res.end()
      return { userLoggedIn: false }
    }

    return { token: cookies.token }
  }
}

export default withApollo()(IndexPage)
