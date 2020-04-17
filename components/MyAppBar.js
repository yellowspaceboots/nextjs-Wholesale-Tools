import React, { useState } from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Hidden from '@material-ui/core/Hidden'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import Avatar from '@material-ui/core/Avatar'
import AlarmIcon from '@material-ui/icons/Alarm'
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import Badge from '@material-ui/core/Badge'
import InternalLink from './InternalLink'
import moment from 'moment'
import WLogo from './WLogo'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'

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

const MyAppBar = ({ handleDrawerToggle }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const notificationClick = (event) => setAnchorEl(event.currentTarget)
  const notificationClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)
  return (
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
  )
}

export default MyAppBar
