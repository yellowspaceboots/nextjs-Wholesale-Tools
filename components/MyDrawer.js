import React from 'react'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import EventIcon from '@material-ui/icons/Event'
import SettingsIcon from '@material-ui/icons/Settings'
import Drawer from '@material-ui/core/Drawer'
// import Hidden from '@material-ui/core/Hidden'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Tooltip from '@material-ui/core/Tooltip'
import Permission from './Permission'
import AssessmentIcon from '@material-ui/icons/Assessment'
import { NextLinkComposed } from './Link'
import { useAuth } from './AuthProvider'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import GmailTreeView from './TreeTest'

const drawerWidth = 200

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: theme.palette.primary.main,
    paddingRight: 10,
    paddingTop: 10
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(7)} + 1px)`
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerIcon: styleProps => ({
    color: styleProps.navColor
  }),
  drawerFont: styleProps => ({
    color: styleProps.navColor
  })
}))

const DrawerTooltip = ({ children, drawerOpen, title }) => (
  <Tooltip
    title={title}
    placement='right'
    arrow
    disableFocusListener={drawerOpen}
    disableHoverListener={drawerOpen}
    disableTouchListener={drawerOpen}
  >
    {children}
  </Tooltip>
)

const MyDrawer = ({ handleDrawerToggle, setMobileOpen, mobileOpen, drawerOpen, setDrawerOpen }) => {
  const hiddenUp = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const hiddenDown = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const { user } = useAuth()
  const theme = useTheme()
  const styleProps = { navColor: 'lightgrey', navPadding: 44 }
  const today = new Date()
  const calendarURL = { pathname: `/calendar/month/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}` }
  const quoteURLQuery = user.role === 'INSIDESALES'
    ? { inside: user.salesRef.number }
    : user.role === 'OUTSIDESALES' ? { outside: user.salesRef.number } : {}
  const quoteURL = { pathname: '/quotations', query: { ...quoteURLQuery, status: 'open' } }
  const classes = useStyles(styleProps)
  const drawer = (perm) => (
    <div className={classes.root}>
      {/*
      <List style={{ marginTop: !perm ? 10 : 75, flex: 1 }}>
        <DrawerTooltip title='Dashboard' drawerOpen={mobileOpen}>
          <ListItem button to={{ pathname: '/' }} component={NextLinkComposed} onClick={mobileOpen ? handleDrawerToggle : null}>
            <ListItemIcon style={{ minWidth: styleProps.navPadding }}><HomeIcon className={classes.drawerIcon} /></ListItemIcon>
            <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Dashboard</Typography>} />
          </ListItem>
        </DrawerTooltip>
        <DrawerTooltip title='Quotations' drawerOpen={mobileOpen}>
          <ListItem button to={quoteURL} component={NextLinkComposed} onClick={mobileOpen ? handleDrawerToggle : null}>
            <ListItemIcon style={{ minWidth: styleProps.navPadding }}><AssessmentIcon className={classes.drawerIcon} /></ListItemIcon>
            <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Quotations</Typography>} />
          </ListItem>
        </DrawerTooltip>
        <DrawerTooltip title='Calendar' drawerOpen={mobileOpen}>
          <ListItem button to={calendarURL} component={NextLinkComposed} onClick={mobileOpen ? handleDrawerToggle : null}>
            <ListItemIcon style={{ minWidth: styleProps.navPadding }}><EventIcon className={classes.drawerIcon} /></ListItemIcon>
            <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Calendar</Typography>} />
          </ListItem>
        </DrawerTooltip>
        <Permission availableTo={['MANAGER']}>
          <DrawerTooltip title='Settings' drawerOpen={mobileOpen}>
            <ListItem button to={{ pathname: '/settings' }} component={NextLinkComposed} onClick={mobileOpen ? handleDrawerToggle : null}>
              <ListItemIcon style={{ minWidth: styleProps.navPadding }}><SettingsIcon className={classes.drawerIcon} /></ListItemIcon>
              <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Settings</Typography>} />
            </ListItem>
          </DrawerTooltip>
        </Permission>
      </List>
      <List>
        <ListItem
          button onClick={() => {
            setDrawerOpen(!drawerOpen)
            setMobileOpen(false)
          }}
        >
          <ListItemIcon>{!drawerOpen ? <NavigateNextIcon className={classes.drawerIcon} /> : <NavigateBeforeIcon className={classes.drawerIcon} />}</ListItemIcon>
          <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Pin</Typography>} />
        </ListItem>
      </List>

    */}

      <GmailTreeView />

    </div>
  )
  return (
    <nav aria-label='mailbox folders'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      {
      //  <Hidden smUp implementation='css'>
  !hiddenUp && (
    <Drawer
      variant='permanent'
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper
      }}
      ModalProps={{
        keepMounted: true // Better open performance on mobile.
      }}
    >
      <div style={{ height: 80 }} />
      {drawer(false)}
    </Drawer>
  )
 // </Hidden>
}
      {drawerOpen && (
        <>
          {/* <Drawer
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: !drawerOpen,
              [classes.drawerClose]: drawerOpen
            })
          }}
          variant='permanent'
          open
        >
          {drawer(true)}
        </Drawer> */}
          <Drawer
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: drawerOpen,
                [classes.drawerClose]: !drawerOpen
              })
            }}
            variant='permanent'
            open
          >
            <div style={{ height: 80 }} />
            {drawer(true)}
          </Drawer>
        </>
      )}
    </nav>
  )
}

export default MyDrawer
