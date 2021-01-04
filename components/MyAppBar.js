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
import AccountCircle from '@material-ui/icons/AccountCircle'
import Backspace from '@material-ui/icons/Backspace'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import AddProjectDialog from './AddProjectDialog'
import AddSalesmanDialog from './AddSalesmanDialog'
import { formatDistanceToNow } from 'date-fns'
import Permission from './Permission'
import AddBusinessIcon from '@material-ui/icons/AddBusiness'
import AddChartIcon from '@material-ui/icons/Addchart'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import AddCustomerDialog from './AddCustomerDialog'
import SearchBar from './SearchBar'

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
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    },
    '& .MuiAutocomplete-input': {
      color: 'white',
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 300,
        '&:focus': {
          width: 300
        }
      }
    },
    '& .MuiAutocomplete-clearIndicator': {
      color: 'white'
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

const MyAppBar = ({ handleDrawerToggle, logout }) => {
  const dateToNow = formatDistanceToNow(new Date(), { addSuffix: true })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [salesDialogOpen, setSalesDialogOpen] = useState(false)
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false)
  const handleClickOpen = () => {
    setDialogOpen(true)
  }
  const handleSalesClickOpen = () => {
    setSalesDialogOpen(true)
  }
  const handleCustomerClickOpen = () => {
    setCustomerDialogOpen(true)
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
          <AddChartIcon />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant='body2'>New Quote</Typography>}
        />
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          e.preventDefault()
          handleSalesClickOpen()
          addClose()
        }}
      >
        <ListItemIcon>
          <GroupAddIcon />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant='body2'>New Salesman</Typography>}
        />
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          e.preventDefault()
          handleCustomerClickOpen()
          addClose()
        }}
      >
        <ListItemIcon>
          <AddBusinessIcon />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant='body2'>New Customer</Typography>}
        />
      </MenuItem>
    </Menu>
  )
  const renderAddDialog = (
    <AddProjectDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
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
        <Hidden smDown implementation='css'>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5' noWrap style={{ fontWeight: 700 }}>Wholesale Electric</Typography>
            <Typography variant='caption' noWrap style={{ marginTop: -8, textTransform: 'uppercase' }}>Supply Company of Houston</Typography>
          </div>
        </Hidden>
        <div style={{ display: 'flex', flexGrow: 1 }} />
        <SearchBar />
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
      <AddSalesmanDialog dialogOpen={salesDialogOpen} setDialogOpen={setSalesDialogOpen} />
      <AddCustomerDialog dialogOpen={customerDialogOpen} setDialogOpen={setCustomerDialogOpen} />
    </AppBar>
  )
}

export default MyAppBar
