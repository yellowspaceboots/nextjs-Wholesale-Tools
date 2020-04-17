import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MyDrawer from './MyDrawer'
import MyAppBar from './MyAppBar'

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

const Layout = ({ setLoginData, children }) => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
  return (
    <div className={classes.root}>
      <MyAppBar handleDrawerToggle={handleDrawerToggle} />
      <MyDrawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} setLoginData={setLoginData} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default Layout
