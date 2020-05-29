import React, { useState } from 'react'
import clsx from 'clsx'
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
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Tooltip from '@material-ui/core/Tooltip'

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
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1
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

const MyDrawer = ({ handleDrawerToggle, mobileOpen }) => {
  const theme = useTheme()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const styleProps = {
    navColor: 'lightgrey',
    navPadding: 44
  }
  const today = new Date()
  const calendarURL = `/calendar/month/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
  const classes = useStyles(styleProps)
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
  const drawer = (
    <div className={classes.root}>
      <List style={{ padding: 0, marginTop: mobileOpen ? 10 : 75, flex: 1 }}>
        <DrawerTooltip title='Dashboard' drawerOpen={mobileOpen || drawerOpen}>
          <ListItem button href='/' as='/' component={InternalLink} onClick={mobileOpen ? handleDrawerToggle : null}>
            <ListItemIcon style={{ minWidth: styleProps.navPadding }}>{<HomeIcon className={classes.drawerIcon} />}</ListItemIcon>
            <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Dashboard</Typography>} />
          </ListItem>
        </DrawerTooltip>
        <DrawerTooltip title='Projects' drawerOpen={mobileOpen || drawerOpen}>
          <ListItem button href='/projects' as='/projects' component={InternalLink} onClick={mobileOpen ? handleDrawerToggle : null}>
            <ListItemIcon style={{ minWidth: styleProps.navPadding }}>{<WidgetsIcon className={classes.drawerIcon} />}</ListItemIcon>
            <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Projects</Typography>} />
          </ListItem>
        </DrawerTooltip>
        <DrawerTooltip title='Calendar' drawerOpen={mobileOpen || drawerOpen}>
          <ListItem button href='/calendar/[...params]' as={calendarURL} component={InternalLink} onClick={mobileOpen ? handleDrawerToggle : null}>
            <ListItemIcon style={{ minWidth: styleProps.navPadding }}>{<EventIcon className={classes.drawerIcon} />}</ListItemIcon>
            <ListItemText disableTypography primary={<Typography variant='body2' className={classes.drawerFont}>Calendar</Typography>} />
          </ListItem>
        </DrawerTooltip>
        {/* drawerNavConfig.map(nestedNavigation => {
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
        }) */}
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
      <Hidden xsDown implementation='css'>
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
