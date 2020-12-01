import React, { useState } from 'react'
import { makeStyles, alpha } from '@material-ui/core/styles'
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
import WLogo from './WLogo'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Backspace from '@material-ui/icons/Backspace'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import WidgetsIcon from '@material-ui/icons/Widgets'
import AddProjectDialog from './AddProjectDialog'
import { useProjects } from './ProjectProvider'
import { formatDistanceToNow } from 'date-fns'
import PersonIcon from '@material-ui/icons/Person'
import Permission from './Permission'

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
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
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

const DialogWithRefetch = ({ dialogOpen, setDialogOpen }) => {
  const { loading, error, query, variables } = useProjects()
  if (loading) return null
  if (error) return `Error! ${error.message}`
  return <AddProjectDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} query={query} variables={variables} />
}

const MyAppBar = ({ handleDrawerToggle, logout }) => {
  const dateToNow = formatDistanceToNow(new Date(), { addSuffix: true })
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleClickOpen = () => {
    setDialogOpen(true)
  }
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const notificationClick = (event) => setAnchorEl(event.currentTarget)
  const notificationClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)
  const renderNotificationMenu = (
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
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <Typography variant='body1' style={{ padding: 10, paddingLeft: 20, fontWeight: 700, width: 300 }}>Notifications</Typography>
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
          secondary={<Typography color='textSecondary' variant='body2'>{dateToNow}</Typography>}
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
          secondary={<Typography color='textSecondary' variant='body2'>{dateToNow}</Typography>}
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
          secondary={<Typography color='textSecondary' variant='body2'>{dateToNow}</Typography>}
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
  )
  const [profileEl, setProfileEl] = useState(null)
  const profileClick = (event) => setProfileEl(event.currentTarget)
  const profileClose = () => setProfileEl(null)
  const profileOpen = Boolean(profileEl)
  const renderProfileMenu = (
    <Menu
      id='fade-menu'
      anchorEl={profileEl}
      keepMounted
      open={profileOpen}
      onClose={profileClose}
      TransitionComponent={Fade}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <Typography variant='body1' style={{ padding: 10, paddingLeft: 20, fontWeight: 700, width: 200 }}>Profile</Typography>
      <Divider />
      <MenuItem
        onClick={(e) => {
          e.preventDefault()
          profileClose()
          logout()
        }}

      >
        <ListItemIcon>
          <Backspace />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant='body2'>Logout</Typography>}
        />
      </MenuItem>
    </Menu>
  )
  const [addEl, setAddEl] = useState(null)
  const addClick = (event) => setAddEl(event.currentTarget)
  const addClose = () => setAddEl(null)
  const addOpen = Boolean(addEl)
  const renderAddMenu = (
    <Menu
      id='fade-menu'
      anchorEl={addEl}
      keepMounted
      open={addOpen}
      onClose={addClose}
      TransitionComponent={Fade}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <MenuItem
        onClick={(e) => {
          e.preventDefault()
          handleClickOpen()
          addClose()
        }}
      >
        <ListItemIcon>
          <WidgetsIcon />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant='body2'>Add Project</Typography>}
        />
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          e.preventDefault()
          addClose()
        }}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant='body2'>Add Salesman</Typography>}
        />
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          e.preventDefault()
          addClose()
        }}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant='body2'>Add Customer</Typography>}
        />
      </MenuItem>
    </Menu>
  )
  const renderAddDialog = (
    <DialogWithRefetch dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
  )
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
          <WLogo size={40} color='#1e3f76' borderColor='white' borderSize={4} containerStyle={{ margin: 15, marginLeft: -16, marginRight: 12 }} />
        </InternalLink>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Typography variant='h5' style={{ fontWeight: 700 }}>Wholesale Electric</Typography>
          <Typography variant='caption' style={{ marginTop: -8, textTransform: 'uppercase' }}>Supply Company of Houston</Typography>
        </div>
        <Hidden smDown implementation='css'>
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
        <Permission availableTo={['MANAGER']}>
          <IconButton
            color='inherit'
            aria-label='Add'
            onClick={addClick}
          >
            <AddCircleIcon />
          </IconButton>
          {renderAddMenu}
        </Permission>
        <IconButton
          color='inherit'
          aria-label='Notifications'
          onClick={notificationClick}
        >
          <Badge color='secondary' overlap='circular' variant='dot'>
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
        {renderNotificationMenu}
        <IconButton
          edge='end'
          aria-label='account of current user'
          aria-haspopup='true'
          onClick={profileClick}
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        {renderProfileMenu}
      </Toolbar>
      {renderAddDialog}
    </AppBar>
  )
}

export default MyAppBar
