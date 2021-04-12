import React from 'react'
import Switch from '@material-ui/core/Switch'
import { CUSTOMERS_USED_BY_COMMERCIAL_PROJECTS } from '../lib/queries/customersUsedByCommercialProjects'

const CommercialEditCustomerToggle = ({ id, currentState, updateCustomers }) => {
  return (
    <Switch
      checked={currentState}
      onChange={() => {
        updateCustomers({
          refetchQueries: [{ query: CUSTOMERS_USED_BY_COMMERCIAL_PROJECTS }],
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
