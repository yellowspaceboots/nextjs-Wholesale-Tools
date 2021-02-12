import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import EventIcon from '@material-ui/icons/Event'
import SettingsIcon from '@material-ui/icons/Settings'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Tooltip from '@material-ui/core/Tooltip'
import Permission from './Permission'
import AssessmentIcon from '@material-ui/icons/Assessment'
import { NextLinkComposed } from './Link'
import { useAuth } from './AuthProvider'

const drawerWidth = 180

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: theme.palette.primary.main
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

const MyDrawer = ({ handleDrawerToggle, mobileOpen, drawerOpen, setDrawerOpen }) => {
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
  const drawer = (
    <div className={classes.root}>
      <List style={{ padding: 0, marginTop: mobileOpen ? 10 : 75, flex: 1 }}>
        <DrawerTooltip title='Dashboard' drawerOpen={mobileOpen || drawerOpen}>
          <ListItem button to={{ pathname: '/' }} component={NextLinkComposed} onClick={mobileOpen ? handleDrawerToggle : null}>
            <ListItemIcon style={{ minWidth: styleProps.navPadding }}><HomeIcon className={classes.drawerIcon} /></ListItemIcon>
            <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Dashboard</Typography>} />
          </ListItem>
        </DrawerTooltip>
        <DrawerTooltip title='Quotations' drawerOpen={mobileOpen || drawerOpen}>
          <ListItem button to={quoteURL} component={NextLinkComposed} onClick={mobileOpen ? handleDrawerToggle : null}>
            <ListItemIcon style={{ minWidth: styleProps.navPadding }}><AssessmentIcon className={classes.drawerIcon} /></ListItemIcon>
            <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Quotations</Typography>} />
          </ListItem>
        </DrawerTooltip>
        <DrawerTooltip title='Calendar' drawerOpen={mobileOpen || drawerOpen}>
          <ListItem button to={calendarURL} component={NextLinkComposed} onClick={mobileOpen ? handleDrawerToggle : null}>
            <ListItemIcon style={{ minWidth: styleProps.navPadding }}><EventIcon className={classes.drawerIcon} /></ListItemIcon>
            <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Calendar</Typography>} />
          </ListItem>
        </DrawerTooltip>
        <Permission availableTo={['MANAGER']}>
          <DrawerTooltip title='Settings' drawerOpen={mobileOpen || drawerOpen}>
            <ListItem button to={{ pathname: '/settings' }} component={NextLinkComposed} onClick={mobileOpen ? handleDrawerToggle : null}>
              <ListItemIcon style={{ minWidth: styleProps.navPadding }}><SettingsIcon className={classes.drawerIcon} /></ListItemIcon>
              <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Settings</Typography>} />
            </ListItem>
          </DrawerTooltip>
        </Permission>
      </List>
      <List>
        <ListItem button onClick={() => setDrawerOpen(!drawerOpen)}>
          <ListItemIcon>{!drawerOpen ? <NavigateNextIcon className={classes.drawerIcon} /> : <NavigateBeforeIcon className={classes.drawerIcon} />}</ListItemIcon>
          <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Collapse</Typography>} />
        </ListItem>
      </List>
    </div>
  )
  return (
    <nav aria-label='mailbox folders'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation='css'>
        <Drawer
          variant='temporary'
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
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css'>
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
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default MyDrawer
