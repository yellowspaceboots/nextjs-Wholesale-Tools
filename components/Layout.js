import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import LinearProgress from '@mui/material/LinearProgress'
import MyDrawer from './MyDrawer'
import MyAppBar from './MyAppBar'
import { useAuth } from '../components/AuthProvider'
import { useApolloClient } from '@apollo/client'
import cookie from 'js-cookie'
import { DropDownProvider } from '../components/DropDownProvider'
import { DrawerDataProvider } from '../components/DrawerDataProvider'
import Fab from '@mui/material/Fab'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Zoom from '@mui/material/Zoom'
import { styled } from '@mui/system'

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

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
  const [drawerOpen, setDrawerOpen] = useState(true)
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
  const logout = () => {
    client.resetStore()
    cookie.remove('token')
    setUser(false)
  }
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' }) 
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 })
  const drawerWidth = 190
  if (!checked) return null
  if (!user) return null
  return (
    <DropDownProvider>
      <DrawerDataProvider>
      <Box sx={{ display: 'flex', height: '100vh' }}>
          {loading && <LinearProgress color='secondary' sx={{ position: 'absolute', padding: 0, width: '100%', zIndex: 3000 }} />}
          <MyAppBar id='back-to-top-anchor' handleDrawerToggle={handleDrawerToggle} logout={logout} />
          <MyDrawer drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
          <Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: '100%', ml: { xs: 0, sm: drawerWidth/8 } }}>
          <Offset />
            <Box sx={{ display: { sm: 'none', xs: 'block' }, height: 30 }} />
            {children}
            <Zoom in={trigger}>
              <Box role='presentation' sx={{ position: 'fixed', bottom: 30, right: 20 }}>
                <Fab color='secondary' size='small' aria-label='scroll back to top' onClick={() => scrollTop()}>
                  <KeyboardArrowUpIcon />
                </Fab>
              </Box>
            </Zoom>
          </Box>
        </Box>
      </DrawerDataProvider>
    </DropDownProvider>
  )
}

export const getLayout = page => <Layout>{page}</Layout>

export default Layout
