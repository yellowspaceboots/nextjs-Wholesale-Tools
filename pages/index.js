import React from 'react'
import { getLayout } from '../components/Layout'
import { useAuth } from '../components/AuthProvider'
import ManagerDashboard from '../components/ManagerDashboard'

const IndexPage = () => {
  const { user } = useAuth()
  switch (user.role) {
    case 'MANAGER':
      return (
        <ManagerDashboard />
      )
    case 'INSIDESALES':
      return (
        <div>Inside Sales Dashboard coming soon.</div>
      )
    case 'OUTSIDESALES':
      return (
        <div>Outisde Sales Dashboard coming soon.</div>
      )
    default:
      return null
  }
}

IndexPage.getLayout = getLayout

export default IndexPage
