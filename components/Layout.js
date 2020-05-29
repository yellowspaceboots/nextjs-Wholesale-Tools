import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import MyDrawer from './MyDrawer'
import MyAppBar from './MyAppBar'
import { useAuth } from '../components/AuthProvider'
import { useApolloClient } from '@apollo/client'
import cookie from 'js-cookie'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const Layout = ({ children }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const handleStart = (url) => setLoading(true)
    const handleComplete = (url) => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })
  const { user, checked, setUser } = useAuth()
  const client = useApolloClient()
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
  const logout = () => {
    client.resetStore()
    cookie.remove('token')
    setUser(false)
  }
  if (!checked) return null
  if (!user) return null
  return (
    <div className={classes.root}>
      {loading && <LinearProgress color='secondary' style={{ position: 'absolute', padding: 0, width: '100%', zIndex: 3000 }} />}
      <MyAppBar handleDrawerToggle={handleDrawerToggle} logout={logout} />
      <MyDrawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export const getLayout = page => <Layout>{page}</Layout>

export default Layout
