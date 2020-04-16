import React, { useState } from 'react'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

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
