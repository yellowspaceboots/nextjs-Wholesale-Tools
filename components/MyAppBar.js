import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import Avatar from '@mui/material/Avatar'
import AlarmIcon from '@mui/icons-material/Alarm'
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate'
import AnnouncementIcon from '@mui/icons-material/Announcement'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import WLogo from './WLogo'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Backspace from '@mui/icons-material/Backspace'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AddProjectDialog from './AddProjectDialog'
import AddSalesmanDialog from './AddSalesmanDialog'
import { formatDistanceToNow } from 'date-fns'
import Permission from './Permission'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import AddChartIcon from '@mui/icons-material/Addchart'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import AddCustomerDialog from './AddCustomerDialog'
import SearchBar from './SearchBar'
import { NextLinkComposed } from './Link'
import Tooltip from '@mui/material/Tooltip'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Slide from '@mui/material/Slide'

const HideOnScroll = ({ children, trigger }) => {
  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  )
}

const MyAppBar = ({ handleDrawerToggle, logout }) => {
  const trigger = useScrollTrigger()
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
          <Avatar sx={{ m: 1.3, ml: 0, color: '#fff', backgroundColor: 'secondary.main' }}>
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
          <Avatar sx={{ m: 1.3, ml: 0, color: '#fff', backgroundColor: 'primary.main' }}>
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
          <Avatar sx={{ m: 1.3, ml: 0, color: '#fff', backgroundColor: 'green' }}>
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
          <Avatar sx={{ m: 1.3, ml: 0 }}>
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
    <>
       <AppBar position='fixed' elevation={5} sx={{ zIndex: 'myAppBar', height: 80, display: { xs: 'none', sm: 'block' } }}>
         <Toolbar sx={{ height: 80 }}>
           <IconButton
             color='inherit'
             aria-label='Open drawer'
             edge='start'
             onClick={handleDrawerToggle}
             sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
           >
             <MenuIcon />
           </IconButton>
           <IconButton
             color='inherit'
             aria-label='Open drawer'
             edge='start'
             onClick={handleDrawerToggle}
             style={{ marginLeft: -14, marginRight: 4 }}
           >
             <MenuIcon />
           </IconButton>
           <NextLinkComposed to={{ pathname: '/' }}>
             <WLogo size={56} color='#1e3f76' borderColor='white' borderSize={4} containerStyle={{ marginRight: 8 }} />
           </NextLinkComposed>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 30 }}>
             <Typography noWrap style={{ fontWeight: 700, fontFamily: 'Times New Roman', textTransform: 'uppercase', fontSize: 21 }}>Wholesale</Typography>
             <Typography noWrap style={{ marginTop: -14, fontWeight: 700, fontFamily: 'Times New Roman', textTransform: 'uppercase', fontSize: 26 }}>Electric</Typography>
             <Typography noWrap style={{ marginTop: -8, fontFamily: 'Times New Roman', textTransform: 'uppercase', fontSize: 9 }}>Supply Company of Houston</Typography>
           </div>
           <SearchBar id='desktop' />
           <div style={{ width: 20 }} />
           <Permission availableTo={['MANAGER']}>
             <Tooltip title='Create' placement='bottom'>
               <IconButton
                 color='inherit'
                 aria-label='Add'
                 onClick={addClick}
               >
                 <AddCircleIcon />
               </IconButton>
             </Tooltip>
             {renderAddMenu}
           </Permission>
           <Tooltip title='Notifications' placement='bottom'>
             <IconButton
               color='inherit'
               aria-label='Notifications'
               onClick={notificationClick}
             >
               <Badge color='secondary' overlap='circular' variant='dot'>
                 <NotificationsNoneIcon />
               </Badge>
             </IconButton>
           </Tooltip>
           {renderNotificationMenu}
           <Tooltip title='Account' placement='bottom'>
             <IconButton
               edge='end'
               aria-label='account of current user'
               aria-haspopup='true'
               onClick={profileClick}
               color='inherit'
             >
               <AccountCircle />
             </IconButton>
           </Tooltip>
           {renderProfileMenu}
         </Toolbar>
         {renderAddDialog}
         <AddSalesmanDialog dialogOpen={salesDialogOpen} setDialogOpen={setSalesDialogOpen} />
         <AddCustomerDialog dialogOpen={customerDialogOpen} setDialogOpen={setCustomerDialogOpen} />
       </AppBar>
       <HideOnScroll trigger={trigger}>
         <AppBar position='fixed' elevation={0} sx={{ height: 80, display: { xs: 'block', sm: 'none' } }}>
           <Toolbar sx={{ height: 40 }}>
             <NextLinkComposed to={{ pathname: '/' }}>
               <WLogo size={40} color='#1e3f76' borderColor='white' borderSize={4} containerStyle={{ marginLeft: -8, marginRight: 16 }} />
             </NextLinkComposed>
             <div style={{ display: 'flex', flexGrow: 1 }} />
             <Permission availableTo={['MANAGER']}>
               <Tooltip title='Create' placement='bottom'>
                 <IconButton
                   color='inherit'
                   aria-label='Add'
                   onClick={addClick}
                 >
                   <AddCircleIcon />
                 </IconButton>
               </Tooltip>
               {renderAddMenu}
             </Permission>
             <Tooltip title='Notifications' placement='bottom'>
               <IconButton
                 color='inherit'
                 aria-label='Notifications'
                 onClick={notificationClick}
               >
                 <Badge color='secondary' overlap='circular' variant='dot'>
                   <NotificationsNoneIcon />
                 </Badge>
               </IconButton>
             </Tooltip>
             {renderNotificationMenu}
             <Tooltip title='Account' placement='bottom'>
               <IconButton
                 edge='end'
                 aria-label='account of current user'
                 aria-haspopup='true'
                 onClick={profileClick}
                 color='inherit'
               >
                 <AccountCircle />
               </IconButton>
             </Tooltip>

             {renderProfileMenu}
           </Toolbar>
           {renderAddDialog}
           <AddSalesmanDialog dialogOpen={salesDialogOpen} setDialogOpen={setSalesDialogOpen} />
           <AddCustomerDialog dialogOpen={customerDialogOpen} setDialogOpen={setCustomerDialogOpen} />
         </AppBar>
       </HideOnScroll>

       <AppBar elevation={0} sx={{ display: { xs: 'block', sm: 'none' } }} style={{ marginTop: trigger ? 0 : 50 }}>
         <Toolbar sx={{ height: 40 }}>
           {trigger && (
             <NextLinkComposed to={{ pathname: '/' }}>
               <WLogo size={30} color='#1e3f76' borderColor='white' borderSize={4} containerStyle={{ marginLeft: -8, marginRight: 16 }} />
             </NextLinkComposed>
           )}
           <IconButton
             color='inherit'
             aria-label='Open drawer'
             edge='start'
             onClick={handleDrawerToggle}
             sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
           >
             <MenuIcon />
           </IconButton>
           <SearchBar id='mobile' />
         </Toolbar>
       </AppBar>
    </>
  )
}

export default MyAppBar
