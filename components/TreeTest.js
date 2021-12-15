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
import { useRouter } from 'next/router'
import Permission from './Permission'
import { useDrawerData } from './DrawerDataProvider'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
import CalendarViewMonthIcon from '@material-ui/icons/CalendarViewMonth'
import CalendarViewWeekIcon from '@material-ui/icons/CalendarViewWeek'
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned'
import { useAuth } from './AuthProvider'

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: 'white',
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover
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
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0, pl: 0 }}>
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
  const { user } = useAuth()
  const router = useRouter()
  const { counts } = useDrawerData()
  const quoteURLQuery = user.role === 'INSIDESALES'
    ? { inside: user.salesRef.number }
    : user.role === 'OUTSIDESALES' ? { outside: user.salesRef.number } : {}
  const openQuoteURL = { pathname: '/quotations', query: { ...quoteURLQuery, status: 'open' } }
  const pendingQuoteURL = { pathname: '/quotations', query: { ...quoteURLQuery, status: 'pending' } }
  const closedQuoteURL = { pathname: '/quotations', query: { ...quoteURLQuery, status: 'closed' } }
  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth() + 1
  const todayDay = today.getDate()
  const monthLink = `/calendar/month/${todayYear}/${todayMonth}/${todayDay}`
  const weekLink = `/calendar/week/${todayYear}/${todayMonth}/${todayDay}`
  const dayLink = `/calendar/day/${todayYear}/${todayMonth}/${todayDay}`

  const pastDueURL = { pathname: '/quotations', query: { end: `${todayMonth}/${todayDay}/${todayYear}`, ...quoteURLQuery, status: 'open' } }

  const urlToNodeId = {
    '/': '1',
    '/settings': '4',
    [openQuoteURL]: '5',
    [pendingQuoteURL]: '6',
    [closedQuoteURL]: '7',
    [monthLink]: '8',
    [weekLink]: '9',
    [dayLink]: '10',
    [pastDueURL]: '11'
  }
  const [selected, setSelected] = useState(null)

  const handleSelect = (event, nodeIds) => {
    const nodeIdToUrl = {
      1: '/',
      4: '/settings',
      5: openQuoteURL,
      6: pendingQuoteURL,
      7: closedQuoteURL,
      8: monthLink,
      9: weekLink,
      10: dayLink,
      11: pastDueURL
    }
    const myRoute = nodeIdToUrl[nodeIds] || null
    if (myRoute) { router.push(myRoute) }
  }

  const handleRouteChange = () => {
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
        bgColor='#dde2ee'
      />
      <StyledTreeItem
        nodeId='2'
        labelText='Quotations'
        labelIcon={AssignmentIcon}
        color='grey'
        bgColor='white'
      >
        <StyledTreeItem
          nodeId='11'
          labelText='Past Due'
          labelIcon={AssignmentLateIcon}
          labelInfo={counts.pastDue}
          color='#d32f2f'
          bgColor='#ffe6e6'
        />
        <StyledTreeItem
          nodeId='5'
          labelText='Open'
          labelIcon={AssignmentLateIcon}
          labelInfo={counts.open}
          color='green'
          bgColor='#e8feeb'
        />
        <StyledTreeItem
          nodeId='6'
          labelText='Pending'
          labelIcon={AssignmentTurnedInIcon}
          labelInfo={counts.pending}
          color='#ffbb41'
          bgColor='#fff6e6'
        />
        <StyledTreeItem
          nodeId='7'
          labelText='Closed'
          labelIcon={AssignmentReturnedIcon}
          labelInfo={counts.closed}
          color='grey'
          bgColor='whitesmoke'
        />
      </StyledTreeItem>
      <StyledTreeItem
        nodeId='3'
        labelText='Calendar'
        labelIcon={EventIcon}
        color='grey'
        bgColor='white'
      >
        <StyledTreeItem
          nodeId='10'
          labelText='Today'
          labelIcon={CalendarViewDayIcon}
          labelInfo={counts.today}
          color='#1e3f76'
          bgColor='#dde2ee'
        />
        <StyledTreeItem
          nodeId='9'
          labelText='This Week'
          labelIcon={CalendarViewWeekIcon}
          labelInfo={counts.thisWeek}
          color='#1e3f76'
          bgColor='#dde2ee'
        />
        <StyledTreeItem
          nodeId='8'
          labelText='This Month'
          labelIcon={CalendarViewMonthIcon}
          labelInfo={counts.thisMonth}
          color='#1e3f76'
          bgColor='#dde2ee'
        />
      </StyledTreeItem>
      <Permission availableTo={['MANAGER']}>
        <StyledTreeItem
          nodeId='4'
          labelText='Settings'
          labelIcon={SettingsIcon}
          color='#1e3f76'
          bgColor='#dde2ee'
        />
      </Permission>
    </TreeView>
  )
}
