import React from 'react'
import { useAuth } from './AuthProvider'

const Permission = ({ availableTo, children }) => {
  const { user } = useAuth()
  const check = availableTo.includes(user.role)
  if (!check) return null
  return (
    <>
      {children}
    </>
  )
}

export default Permission
