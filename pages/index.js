import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import cookie from 'cookie'
import { withApollo } from '../api/apollo'
import LoginForm from '../components/LoginForm'
import { GET_ALL_FILES } from '../api/queries/getAllFiles'
import { GET_USER } from '../api/queries/getUser'
import { getLayout } from '../components/Layout'
import { redirectToLogin } from '../components/redirect'

const IndexPage = ({ userLoggedIn, token }) => {
  const [loginError, setLoginError] = useState(null)
  const [loginData, setLoginData] = useState(token)
  const [getAllFiles, { loading, data: allFilesData, error: allFilesError }] = useLazyQuery(GET_ALL_FILES)
  const [getUser, { loading: userLoading, data: userData, error: userError }] = useLazyQuery(GET_USER)
  useEffect(() => {
    if (!userLoggedIn) {
      redirectToLogin()
    }
  })
  if (!userLoggedIn) return null
  return (
    <>
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
      <button onClick={() => getUser()}>Get User</button>
      <br />
      User Data
      <pre>
        {userLoading ? (
          <div>loading...</div>
        ) : userError ? (
          JSON.stringify(userError, null, 2)
        ) : (
          JSON.stringify(userData, null, 2)
        )}
      </pre>
    </>
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

    return { token: cookies.token, userLoggedIn: Boolean(cookies.token) }
  }
}
const IndexPageWithApollo = withApollo()(IndexPage)

IndexPageWithApollo.getLayout = getLayout

export default IndexPageWithApollo
