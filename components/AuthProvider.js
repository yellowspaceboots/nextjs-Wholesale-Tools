import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../api/queries/getUser'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const { pathname, push } = useRouter()
  const [user, setUser] = useState(false)
  const [checked, setChecked] = useState(false)
  const userMemo = useMemo(() => ({ user, setUser }), [user, setUser])
  const { loading, error, data } = useQuery(GET_USER, {
    onCompleted: data => {
      console.log('running user query')
      setChecked(true)
      setUser(data.currentUser)
    },
    onError: error => {
      setUser(false)
      setChecked(true)
      console.log(error)
    }
  })
  useEffect(() => {
    if (pathname !== '/login' && (checked && !userMemo.user)) {
      push('/login')
    }
    if (pathname === '/login' && userMemo.user) {
      push('/')
    }
  })
  return (
    <AuthContext.Provider value={{ user, checked, setUser }}>{children}</AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
