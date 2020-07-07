import React from 'react'
import Typography from '@material-ui/core/Typography'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { getStatusColor } from '../testApi/utils'

const Status = ({ status, includeWords, style }) => {
  const statusColor = getStatusColor(status)
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
