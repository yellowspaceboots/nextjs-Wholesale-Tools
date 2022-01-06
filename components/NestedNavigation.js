import React, { useState } from 'react'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

const NestedNavigation = ({ icon, padding, title, children, color }) => {
  const [open, setOpen] = useState(false)
  const fontSize = 16
  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon style={{ minWidth: padding }}>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={<Typography variant='body2' style={{ color }}>{title}</Typography>} />
        {open ? <ExpandLess style={{ color, fontSize }} /> : <ExpandMore style={{ color, fontSize }} />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List dense>
          {children}
        </List>
      </Collapse>
    </>
  )
}

export default NestedNavigation
