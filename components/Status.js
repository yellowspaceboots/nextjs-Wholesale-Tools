import React from 'react'
import Typography from '@material-ui/core/Typography'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

const Status = ({ status, includeWords, style }) => {
  const statusColors = {
    'On Track': 'green',
    'At Risk': '#ffbb41',
    'Off Track': 'red',
    Open: '#1e3f76',
    Pending: '#ffbb41',
    Won: 'green',
    Lost: 'red'
  }
  const statusColor = statusColors[status] || 'lightgrey'
  const styleCheck = style || {}
  if (includeWords) {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ...styleCheck }}>
        <FiberManualRecordIcon style={{ fontSize: 10, marginRight: 4, color: statusColor }} />
        {includeWords && <Typography variant='body2' noWrap>{status || 'None'}</Typography>}
      </div>
    )
  }
  return <FiberManualRecordIcon style={{ fontSize: 10, color: statusColor, ...styleCheck }} />
}

export default Status
