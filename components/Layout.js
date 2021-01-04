import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import MyDrawer from './MyDrawer'
import MyAppBar from './MyAppBar'
import { useAuth } from '../components/AuthProvider'
import { useApolloClient } from '@apollo/client'
import cookie from 'js-cookie'
import { DropDownProvider } from '../components/DropDownProvider'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Zoom from '@material-ui/core/Zoom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
  toolbar: theme.mixins.toolbar,
  content: props => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: props.drawerOpen ? 'calc(100% - 179px)' : `calc(100% - ${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%'
    }
  }),
  scroll: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const classes = useStyles({ drawerOpen })
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
  const logout = () => {
    client.resetStore()
    cookie.remove('token')
    setUser(false)
  }
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  })
  if (!checked) return null
  if (!user) return null
  return (
    <DropDownProvider>
      <div className={classes.root}>
        {loading && <LinearProgress color='secondary' style={{ position: 'absolute', padding: 0, width: '100%', zIndex: 3000 }} />}
        <MyAppBar id='back-to-top-anchor' handleDrawerToggle={handleDrawerToggle} logout={logout} />
        <MyDrawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
          <Zoom in={trigger}>
            <div role='presentation' className={classes.scroll}>
              <Fab color='secondary' size='small' aria-label='scroll back to top' onClick={() => scrollTop()}>
                <KeyboardArrowUpIcon />
              </Fab>
            </div>
          </Zoom>
        </main>
      </div>
    </DropDownProvider>
  )
}

export const getLayout = page => <Layout>{page}</Layout>

export default Layout
