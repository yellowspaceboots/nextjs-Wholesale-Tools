import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InternalLink from './InternalLink'
import HomeIcon from '@material-ui/icons/Home'
import Backspace from '@material-ui/icons/Backspace'
import NestedNavigation from './NestedNavigation'
import WidgetsIcon from '@material-ui/icons/Widgets'
import EventIcon from '@material-ui/icons/Event'
import SettingsIcon from '@material-ui/icons/Settings'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import { useApolloClient } from '@apollo/client'
import cookie from 'js-cookie'
import { useAuth } from './AuthProvider'

const drawerWidth = 240

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
  drawerPaper: {
    width: drawerWidth
  },
  divider: styleProps => ({
    backgroundColor: styleProps.navColor
  }),
  drawerIcon: styleProps => ({
    color: styleProps.navColor
  }),
  drawerFont: styleProps => ({
    color: styleProps.navColor
  })
}))

const MyDrawerConfig = ({ handleDrawerToggle, mobileOpen, mobile }) => {
  const { setUser } = useAuth()
  const styleProps = {
    navColor: 'lightgrey',
    navPadding: 44
  }
  const today = new Date()
  const calendarURL = `/calendar/month/${today.getFullYear()}/${today.getMonth() + 1}/1`
  const classes = useStyles(styleProps)
  const client = useApolloClient()
  const navPadding = 44
  const drawerNavConfig = [
    {
      sectionTitle: 'Project Management',
      icon: WidgetsIcon,
      linkList: [
        {
          name: 'Request Log',
          href: '/commercial-projects/request-log'
        },
        {
          name: 'Material Status',
          href: '/commercial-projects/material-status'
        }
      ]
    },
    {
      sectionTitle: 'Accounting',
      icon: AttachMoneyIcon,
      linkList: [
        {
          name: 'End of Month',
          href: '/accounting/end-of-month'
        }
      ]
    },
    {
      sectionTitle: 'Settings',
      icon: SettingsIcon,
      linkList: [
        {
          name: 'Profile',
          href: '/settings/profile'
        },
        {
          name: 'Account Settings',
          href: '/settings/account'
        },
        {
          name: 'User Management',
          href: '/settings/users'
        }
      ]
    }
  ]
  return (
    <div className={classes.root}>
      <List style={{ padding: 0, marginTop: mobileOpen ? 10 : 75, flex: 1 }}>
        <ListItem button href='/' component={InternalLink} onClick={mobile && handleDrawerToggle}>
          <ListItemIcon style={{ minWidth: navPadding }}>{<HomeIcon className={classes.drawerIcon} />}</ListItemIcon>
          <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Overview</Typography>} />
        </ListItem>
        <ListItem button href='/calendar/[...params]' as={calendarURL} component={InternalLink} onClick={mobile && handleDrawerToggle}>
          <ListItemIcon style={{ minWidth: navPadding }}>{<EventIcon className={classes.drawerIcon} />}</ListItemIcon>
          <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Calendar</Typography>} />
        </ListItem>
        {drawerNavConfig.map(nestedNavigation => {
          const Icon = nestedNavigation.icon
          const title = nestedNavigation.sectionTitle
          return (
            <NestedNavigation key={title} padding={navPadding} icon={<Icon className={classes.drawerIcon} />} title={title} color={styleProps.navColor}>
              {nestedNavigation.linkList.map(listItem => (
                <ListItem key={listItem.name} button href={listItem.href} component={InternalLink} onClick={mobile && handleDrawerToggle}>
                  <ListItemText style={{ paddingLeft: navPadding }} inset disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>{listItem.name}</Typography>} />
                </ListItem>
              ))}
            </NestedNavigation>
          )
        })}
      </List>
      <Divider className={classes.divider} />
      <List>
        <ListItem
          button onClick={e => {
            e.preventDefault()
            client.resetStore()
            cookie.remove('token')
            setUser(false)
          }}
        >
          <ListItemIcon>{<Backspace className={classes.drawerIcon} />}</ListItemIcon>
          <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Log Out</Typography>} />
        </ListItem>
      </List>
    </div>
  )
}

const MyDrawer = ({ handleDrawerToggle, mobileOpen }) => {
  const theme = useTheme()
  const classes = useStyles()
  return (
    <nav className={classes.drawer} aria-label='mailbox folders'>
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
          <MyDrawerConfig handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} mobile />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation='css'>
        <Drawer classes={{ paper: classes.drawerPaper }} variant='permanent' open>
          <MyDrawerConfig handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default MyDrawer
