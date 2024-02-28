import React from 'react'
import Switch from '@mui/material/Switch'
import { CUSTOMERS_USED_BY_COMMERCIAL_PROJECTSV10 } from '../lib/queries/customersUsedByCommercialProjects'

const CommercialEditCustomerToggle = ({ id, currentState, updateCustomers }) => {
  return (
    <Switch
      checked={currentState}
      onChange={() => {
        updateCustomers({
          refetchQueries: [{ query: CUSTOMERS_USED_BY_COMMERCIAL_PROJECTSV10 }],
          awaitRefetchQueries: true,
          variables: {
            id,
            data: { usedByCommercial: !currentState }
          }
        })
      }}
      color='primary'
      name='checkedB'
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  )
}

export default CommercialEditCustomerToggle
