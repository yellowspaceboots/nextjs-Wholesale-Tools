import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import useWindowDimensions from '../utils/useWindowDimensions'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import PanToolOutlinedIcon from '@material-ui/icons/PanToolOutlined'
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined'
import HelpIcon from '@material-ui/icons/Help'
import { makeStyles } from '@material-ui/core/styles'
import GroupsIcon from '@material-ui/icons/Groups'
import AvatarGroup from '@material-ui/core/AvatarGroup'
import { motion } from 'framer-motion'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  pink: {
    color: '#fff',
    backgroundColor: '#C827A4'
  },
  blue: {
    color: '#fff',
    backgroundColor: '#1A50C8'
  }
}))

const ShiftContainer = ({ children, id, selected, setSelected }) => {
  const currentlySelected = id === selected
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <AvatarGroup
        onClick={() => setSelected(currentlySelected ? null : id)}
        max={4}
        style={{
          backgroundColor: 'white',
          padding: 2,
          margin: 6,
          borderRadius: 33,
          cursor: 'pointer',
          border: currentlySelected ? 'solid #1A50C8 2px' : 'solid white 2px'
        }}
      >
        {children}
      </AvatarGroup>
    </motion.div>
  )
}

const ShiftTestPage = () => {
  const { height, width } = useWindowDimensions()
  const [selected, setSelected] = useState()
  const classes = useStyles()
  return (
    <Grid
      container
      direction='column'
      justifyContent='space-between'
      alignItems='stretch'
      style={{ backgroundColor: 'whitesmoke', height: height }}
    >
      <Grid
        item
        container
        alignItems='center'
        justifyContent='space-between'
        style={{ padding: 14 }}
      >
        <Grid item style={{ marginLeft: 8 }}>
          <IconButton aria-label='delete' size='small' style={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }}>
            <ChevronLeftIcon fontSize='inherit' style={{ color: 'black' }} />
          </IconButton>
          <Typography variant='caption' style={{ marginLeft: 16, fontWeight: 500 }}>Wholesale Electric Supply Top Level Ov...</Typography>
        </Grid>
        <Grid item style={{ flexWrap: 'nowrap', flexDirection: 'row' }}>
          <Button variant='outlined' disableElevation style={{ backgroundColor: 'white', textTransform: 'none', color: 'black', fontSize: 12, marginRight: 14 }}>
            <PanToolOutlinedIcon style={{ color: 'black', fontSize: 20, fontWeight: 100 }} />
            <NearMeOutlinedIcon style={{ color: 'black', fontSize: 20, fontWeight: 100 }} />
          </Button>
          <Button variant='outlined' disableElevation style={{ backgroundColor: 'white', textTransform: 'none', color: 'black', fontSize: 12 }}>Share</Button>
          <div style={{ display: 'inline-block' }}>
            <Avatar style={{ height: 24, width: 24, backgroundColor: 'black', fontSize: 12, fontWeight: 900, marginLeft: 16, marginRight: 12 }}>J</Avatar>
          </div>
        </Grid>
      </Grid>
      <div style={{ position: 'absolute', borderTop: '1px black solid', width: '100%', height: '50%', bottom: 0, zIndex: 0 }} />
      <motion.div drag>
        <Grid
          item
          container
          alignItems='center'
          justifyContent='space-around'
          style={{ flexGrow: 1, zIndex: 1 }}
        >
          <Fab aria-label='start' style={{ backgroundColor: 'white' }}>
            <PlayArrowIcon />
          </Fab>
          <ShiftContainer id={1} selected={selected} setSelected={setSelected}>
            <Avatar className={classes.pink}>
              <GroupsIcon />
            </Avatar>
          </ShiftContainer>
          <ShiftContainer id={2} selected={selected} setSelected={setSelected}>
            <Avatar className={classes.pink}>
              <GroupsIcon />
            </Avatar>
            <Avatar className={classes.blue}>
              <GroupsIcon />
            </Avatar>
          </ShiftContainer>
          <ShiftContainer id={3} selected={selected} setSelected={setSelected}>
            <Avatar className={classes.blue}>
              <GroupsIcon />
            </Avatar>
            <Avatar className={classes.blue}>
              <GroupsIcon />
            </Avatar>
          </ShiftContainer>
          <ShiftContainer id={4} selected={selected} setSelected={setSelected}>
            <Avatar className={classes.blue}>
              <GroupsIcon />
            </Avatar>
            <Avatar className={classes.blue}>
              <GroupsIcon />
            </Avatar>
            <Avatar className={classes.pink}>
              <GroupsIcon />
            </Avatar>
          </ShiftContainer>
          <ShiftContainer id={5} selected={selected} setSelected={setSelected}>
            <Avatar className={classes.blue}>
              <GroupsIcon />
            </Avatar>
            <Avatar className={classes.pink}>
              <GroupsIcon />
            </Avatar>
          </ShiftContainer>
          <Fab aria-label='stop' style={{ backgroundColor: 'white' }}>
            <StopIcon />
          </Fab>
        </Grid>
      </motion.div>
      <Grid
        item
        container
        alignItems='center'
        justifyContent='space-between'
        style={{ padding: 14 }}
      >
        <Grid item>
          <div style={{ display: 'inline-block' }}>
            <IconButton aria-label='delete' size='small' style={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }}>
              <RemoveIcon fontSize='inherit' style={{ color: 'black' }} />
            </IconButton>
          </div>
          <Typography variant='caption' style={{ paddingLeft: 16, paddingRight: 16, fontWeight: 500 }}>100%</Typography>
          <div style={{ display: 'inline-block' }}>
            <IconButton aria-label='delete' size='small' style={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }}>
              <AddIcon fontSize='inherit' style={{ color: 'black' }} />
            </IconButton>
          </div>
        </Grid>
        <Grid item style={{ marginLeft: -62 }}>
          <Button variant='contained' disableElevation style={{ backgroundColor: '#1A50C8', textTransform: 'none', fontSize: 12 }}>Enter Edit Mode</Button>
        </Grid>
        <Grid item>
          <div style={{ display: 'inline-block' }}>
            <IconButton aria-label='delete' size='small' style={{ backgroundColor: 'rgba(0, 0, 0, 0.00)', marginRight: 12 }}>
              <HelpIcon style={{ color: 'black', fontSize: 30 }} />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ShiftTestPage
