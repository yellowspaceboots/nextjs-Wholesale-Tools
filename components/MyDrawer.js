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
import SettingsIcon from '@material-ui/icons/Settings'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import { useApolloClient } from '@apollo/client'
import cookie from 'js-cookie'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth
  }
}))

const MyDrawerConfig = ({ mobileOpen, setLoginData }) => {
  const theme = useTheme()
  const client = useApolloClient()
  const navPadding = 44
  const navColor = 'lightgrey'
  const drawerNavConfig = [
    {
      sectionTitle: 'Commercial Projects',
      icon: WidgetsIcon,
      linkList: [
        {
          name: 'Request Log',
          href: '/commercial-projects/request-log'
        },
        {
          name: 'Calendar',
          href: '/commercial-projects/calendar'
        },
        {
          name: 'Material Status',
          href: 'commercial-projects/material-status'
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
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: theme.palette.primary.main }}>
      <List style={{ padding: 0, marginTop: mobileOpen ? 10 : 75, flex: 1 }} subheader={<Typography variant='overline' style={{ color: navColor, fontWeight: 600, marginLeft: 18, marginBottom: 10 }}>Navigation</Typography>}>
        <ListItem button href='/' component={InternalLink}>
          <ListItemIcon style={{ minWidth: navPadding }}>{<HomeIcon style={{ color: navColor }} />}</ListItemIcon>
          <ListItemText disableTypography primary={<Typography variant='body2' style={{ color: navColor }}>Overview</Typography>} />
        </ListItem>
        {drawerNavConfig.map(nestedNavigation => {
          const Icon = nestedNavigation.icon
          const title = nestedNavigation.sectionTitle
          return (
            <NestedNavigation key={title} padding={navPadding} icon={<Icon style={{ color: navColor }} />} title={title} color={navColor}>
              {nestedNavigation.linkList.map(listItem => (
                <ListItem key={listItem.name} button href={listItem.href} component={InternalLink}>
                  <ListItemText style={{ paddingLeft: navPadding }} inset disableTypography primary={<Typography variant='body2' style={{ color: navColor }}>{listItem.name}</Typography>} />
                </ListItem>
              ))}
            </NestedNavigation>
          )
        })}
      </List>
      <Divider style={{ color: 'white' }} />
      <List>
        <ListItem
          button onClick={e => {
            e.preventDefault()
            client.resetStore()
            cookie.remove('token')
            setLoginData(null)
          }}
        >
          <ListItemIcon>{<Backspace style={{ color: navColor }} />}</ListItemIcon>
          <ListItemText disableTypography primary={<Typography variant='body2' style={{ color: navColor }}>Log Out</Typography>} />
        </ListItem>
      </List>
    </div>
  )
}

const MyDrawer = ({ handleDrawerToggle, mobileOpen, setLoginData }) => {
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
          <MyDrawerConfig mobileOpen={mobileOpen} setLoginData={setLoginData} />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation='css'>
        <Drawer classes={{ paper: classes.drawerPaper }} variant='permanent' open>
          <MyDrawerConfig mobileOpen={mobileOpen} setLoginData={setLoginData} />
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default MyDrawer
