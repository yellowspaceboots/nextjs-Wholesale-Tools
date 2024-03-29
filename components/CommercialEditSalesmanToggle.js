import React from 'react'
import Switch from '@mui/material/Switch'
import { SALESMEN_USED_BY_COMMERCIAL_PROJECTSV10 } from '../lib/queries/salesmenUsedByCommercialProjects'

const CommercialEditSalesmanToggle = ({ id, currentState, updateSalesman }) => {
  return (
    <Switch
      checked={currentState}
      onChange={() =>
        updateSalesman({
          refetchQueries: [{ query: SALESMEN_USED_BY_COMMERCIAL_PROJECTSV10 }],
          awaitRefetchQueries: true,
          variables: {
            id,
            data: { usedByCommercial: !currentState }
          }
        })}
      color='primary'
      name='checkedB'
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  )
}

export default CommercialEditSalesmanToggle
