import React, { useEffect, useState } from 'react'
import { experimentalStyled as styled } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem, { treeItemClasses } from '@material-ui/lab/TreeItem'
import Typography from '@material-ui/core/Typography'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import HomeIcon from '@material-ui/icons/Home'
import EventIcon from '@material-ui/icons/Event'
import SettingsIcon from '@material-ui/icons/Settings'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ArchiveIcon from '@material-ui/icons/Archive'
import { NextLinkComposed } from './Link'
import { useRouter } from 'next/router'

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: 'white',
  [`& .${treeItemClasses.content}`]: {
    color: 'white',
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)'
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
      paddingLeft: 0
    }
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2)
    }
  }
}))

function StyledTreeItem (props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color='inherit' sx={{ mr: 1 }} />
          <Typography variant='body2' sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant='caption' color='inherit'>
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor
      }}
      {...other}
    />
  )
}

export default function GmailTreeView () {
  const router = useRouter()
  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth() + 1
  const todayDay = today.getDate()
  const monthLink = `/calendar/month/${todayYear}/${todayMonth}/${todayDay}`
  const weekLink = `/calendar/week/${todayYear}/${todayMonth}/${todayDay}`
  const dayLink = `/calendar/day/${todayYear}/${todayMonth}/${todayDay}`

  const urlToNodeId = {
    '/': '1',
    '/settings': '4',
    '/quotations?status=open': '5',
    '/quotations?status=pending': '6',
    '/quotations?status=closed': '7',
    [monthLink]: '8',
    [weekLink]: '9',
    [dayLink]: '10'
  }
  const [selected, setSelected] = useState(null)
  const handleSelect = (event, nodeIds) => {
    const nodeIdToUrl = {
      1: '/',
      4: '/settings',
      5: '/quotations?status=open',
      6: '/quotations?status=pending',
      7: '/quotations?status=closed',
      8: monthLink,
      9: weekLink,
      10: dayLink
    }
    const myRoute = nodeIdToUrl[nodeIds] || null
    if (myRoute) { router.push(myRoute) }
  }
  const handleRouteChange = () => {
    console.log('boom')
    setSelected(null)
    setSelected(urlToNodeId[router.asPath] || null)
  }
  useEffect(() => {
    if (!selected) {
      handleRouteChange()
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <TreeView
      aria-label='gmail'
      defaultExpanded={['2', '3']}
      defaultCollapseIcon={<ArrowDropDownIcon fontSize='small' />}
      defaultExpandIcon={<ArrowRightIcon fontSize='small' />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      onNodeSelect={handleSelect}
      onNodeFocus={() => console.log('placeholder')}
      selected={selected}
      sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <StyledTreeItem
        nodeId='1'
        labelText='Dashboard'
        labelIcon={HomeIcon}
        color='#1e3f76'
        bgColor='white'
      />
      <StyledTreeItem
        nodeId='2'
        labelText='Quotations'
        labelIcon={AssignmentIcon}
        color='#1e3f76'
        bgColor='white'
      >
        <StyledTreeItem
          nodeId='5'
          labelText='Open'
          labelIcon={AssignmentLateIcon}
          labelInfo='90'
          color='green'
          bgColor='#e8feeb'
        />
        <StyledTreeItem
          nodeId='6'
          labelText='Pending'
          labelIcon={AssignmentTurnedInIcon}
          labelInfo='2,294'
          color='#ffbb41'
          bgColor='#fff6e6'
        />
        <StyledTreeItem
          nodeId='7'
          labelText='Closed'
          labelIcon={ArchiveIcon}
          labelInfo='3,566'
          color='grey'
          bgColor='whitesmoke'
        />
      </StyledTreeItem>
      <StyledTreeItem
        nodeId='3'
        labelText='Calendar'
        labelIcon={EventIcon}
        color='#1e3f76'
        bgColor='white'
      >
        <StyledTreeItem
          nodeId='8'
          labelText='This Month'
          labelIcon={AssignmentLateIcon}
          labelInfo='90'
          color='green'
          bgColor='#e8feeb'
        />
        <StyledTreeItem
          nodeId='9'
          labelText='This Week'
          labelIcon={AssignmentTurnedInIcon}
          labelInfo='2,294'
          color='#ffbb41'
          bgColor='#fff6e6'
        />
        <StyledTreeItem
          nodeId='10'
          labelText='Today'
          labelIcon={ArchiveIcon}
          labelInfo='3,566'
          color='grey'
          bgColor='whitesmoke'
        />
      </StyledTreeItem>
      <StyledTreeItem
        nodeId='4'
        labelText='Settings'
        labelIcon={SettingsIcon}
        color='#1e3f76'
        bgColor='white'
      />
    </TreeView>
  )
}
