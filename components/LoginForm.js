import React, { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import cookie from 'js-cookie'
import { LOGIN_USER } from '../lib/mutations/loginUser'
import { Button } from '@material-ui/core'

const LoginForm = ({ setLoginError, setLoginData, getAllFiles }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const client = useApolloClient()
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [loginUser] = useMutation(LOGIN_USER, {
    variables: {
      input: {
        username,
        password: pwd
      }
    },
    onCompleted: data => {
      cookie.set('token', data.loginUser, {
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        expires: 2
      })
      setLoginData(data)
      setIsLoggedIn(true)
      setLoginError(false)
      getAllFiles()
    },
    onError: error => {
      setLoginError(error)
    }
  })
  useEffect(() => {
    setIsLoggedIn(!!cookie.get('token'))
  }, [])
  return (
    <>
      {!isLoggedIn ? (
        <>
          <label htmlFor='username'>Username:</label>
          <input
            type='username'
            id='username'
            name='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label htmlFor='pwd'>Password:</label>
          <input
            type='password'
            id='pwd'
            name='pwd'
            value={pwd}
            onChange={e => setPwd(e.target.value)}
          />
          <Button id='test1' onClick={() => loginUser()}>Login</Button>
        </>
      ) : (
        <Button
          id='test2'
          onClick={e => {
            e.preventDefault()
            client.resetStore()
            cookie.remove('token')
            setLoginData(null)
            setIsLoggedIn(false)
          }}
        >
          Logout
        </Button>
      )}
    </>
  )
}

export default LoginForm
