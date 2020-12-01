import React, { createContext, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { SALESMEN_USED_BY_COMMERCIAL_PROJECTS } from '../testApi/queries/salesmenUsedByCommercialProjects'
import { CUSTOMERS_USED_BY_COMMERCIAL_PROJECTS } from '../testApi/queries/customersUsedByCommercialProjects'

const DropDownContext = createContext()

const DropDownProvider = ({ children }) => {
  const { loading: salesmenLoading, error: salesmenError, data: salesmenData } = useQuery(SALESMEN_USED_BY_COMMERCIAL_PROJECTS)
  const { loading: customerLoading, error: customerError, data: customerData } = useQuery(CUSTOMERS_USED_BY_COMMERCIAL_PROJECTS)
  if (salesmenLoading) return null
  if (customerLoading) return null
  const salesmen = salesmenData.salesmenUsedByCommercialProjects.data
  const customers = customerData.customersUsedByCommercialProjects.data
  return (
    <DropDownContext.Provider value={{ salesmen, customers }}>{children}</DropDownContext.Provider>
  )
}

const useDrowDown = () => useContext(DropDownContext)

export { DropDownProvider, useDrowDown }
