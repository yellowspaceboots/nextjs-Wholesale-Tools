import React, { useState } from 'react'
import { makeStyles, useTheme, fade } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Hidden from '@material-ui/core/Hidden'
import Badge from '@material-ui/core/Badge'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import Avatar from '@material-ui/core/Avatar'
import AlarmIcon from '@material-ui/icons/Alarm'
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import WLogo from './WLogo'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import moment from 'moment'
import InternalLink from './InternalLink'
import HomeIcon from '@material-ui/icons/Home'
import Backspace from '@material-ui/icons/Backspace'
import NestedNavigation from './NestedNavigation'
import WidgetsIcon from '@material-ui/icons/Widgets'
import SettingsIcon from '@material-ui/icons/Settings'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { useApolloClient } from '@apollo/client'
import cookie from 'js-cookie'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10,
    marginLeft: 0
  },
  blueAvatar: {
    margin: 10,
    marginLeft: 0,
    color: '#fff',
    backgroundColor: theme.palette.primary.main
  },
  yellowAvatar: {
    margin: 10,
    marginLeft: 0,
    color: '#fff',
    backgroundColor: theme.palette.secondary.main
  },
  greenAvatar: {
    margin: 10,
    marginLeft: 0,
    color: '#fff',
    backgroundColor: 'green'
  },
  root: {
    display: 'flex',
    height: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    marginRight: 10,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
}))

const Layout = ({ setLoginData, children }) => {
  const classes = useStyles()
  const theme = useTheme()
  const client = useApolloClient()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const notificationClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const notificationClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  function handleDrawerToggle () {
    setMobileOpen(!mobileOpen)
  }
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
  const navPadding = 44
  const navColor = 'lightgrey'
  const drawer = (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: theme.palette.primary.main }}>
        <List style={{ padding: 0, marginTop: 75, flex: 1 }} subheader={<Typography variant='overline' style={{ color: navColor, fontWeight: 600, marginLeft: 18, marginBottom: 10 }}>Navigation</Typography>}>
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
    </>
  )
  return (
    <div className={classes.root}>
      <AppBar position='fixed' elevation={0} className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <InternalLink href='/'>
            <WLogo size={40} color='#1e3f76' borderColor='white' borderSize={4} containerStyle={{ margin: 15, marginLeft: -10, marginRight: 12 }} />
          </InternalLink>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 6, flexGrow: 1 }}>
            <Typography variant='h5' style={{ fontWeight: 700 }}>Wholesale Electric</Typography>
            <Typography variant='caption' style={{ marginTop: -8, textTransform: 'uppercase' }}>Supply Company of Houston</Typography>
          </div>
          <Hidden xsDown implementation='css'>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Hidden>
          <Hidden smUp implementation='css'>
            <IconButton
              color='inherit'
              aria-label='search'
              edge='start'
            >
              <SearchIcon />
            </IconButton>
          </Hidden>
          <IconButton
            color='inherit'
            aria-label='Notifications'
            edge='end'
            onClick={notificationClick}
          >
            <Badge color='secondary' overlap='circle' variant='dot'>
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
          <Menu
            id='fade-menu'
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={notificationClose}
            TransitionComponent={Fade}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <Typography variant='body1' style={{ padding: 20, fontWeight: 700, width: 400 }}>Notifications</Typography>
            <Divider />
            <MenuItem onClick={notificationClose}>
              <ListItemIcon>
                <Avatar className={classes.yellowAvatar}>
                  <AlarmIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant='body2'>Project Bidding Soon</Typography>}
                secondary={<Typography color='textSecondary' variant='body2'>{moment(new Date()).fromNow()}</Typography>}
              />
            </MenuItem>
            <MenuItem onClick={notificationClose}>
              <ListItemIcon>
                <Avatar className={classes.blueAvatar}>
                  <AssignmentLateIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant='body2'>New Project Added</Typography>}
                secondary={<Typography color='textSecondary' variant='body2'>{moment(new Date()).fromNow()}</Typography>}
              />
            </MenuItem>
            <MenuItem onClick={notificationClose}>
              <ListItemIcon>
                <Avatar className={classes.greenAvatar}>
                  <AnnouncementIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant='body2'>New Message for Project</Typography>}
                secondary={<Typography color='textSecondary' variant='body2'>{moment(new Date()).fromNow()}</Typography>}
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={notificationClose}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <NotificationsNoneIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant='body2'>See All Notifications</Typography>}
              />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
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
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default Layout
