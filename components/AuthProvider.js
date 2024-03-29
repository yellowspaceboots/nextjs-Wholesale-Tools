import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_MEV10 } from '../lib/queries/getMe'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const { pathname, push } = useRouter()
  const [user, setUser] = useState()
  const [checked, setChecked] = useState(false)
  const userMemo = useMemo(() => ({ user, setUser }), [user, setUser])
  const { loading, error, data, refetch: refetchUser } = useQuery(GET_MEV10, {
    onCompleted: data => {
      console.log('running user query')
      console.log(data.getMeV10)
      setChecked(true)
      setUser(data.getMeV10)
    },
    onError: error => {
      setUser()
      setChecked(true)
      console.log(error)
    }
  })
  useEffect(() => {
    if (pathname !== '/login' && (checked && !userMemo.user)) {
      push('/login')
    }
    if (pathname === '/login' && userMemo.user) {
      refetchUser()
      push('/')
    }
  })
  if (loading) return null
  return (
    <AuthContext.Provider value={{ user, checked, setUser, refetchUser }}>{children}</AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
