import React, { createContext, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { SALESMEN_USED_BY_COMMERCIAL_PROJECTSV10 } from '../lib/queries/salesmenUsedByCommercialProjects'
import { CUSTOMERS_USED_BY_COMMERCIAL_PROJECTSV10 } from '../lib/queries/customersUsedByCommercialProjects'

const DropDownContext = createContext()

const DropDownProvider = ({ children }) => {
  const { loading: apiSalesmenLoading, error: apiSalesmenError, data: apiSalesmenData } = useQuery(SALESMEN_USED_BY_COMMERCIAL_PROJECTSV10)
  const { loading: apiCustomerLoading, error: apiCustomerError, data: apiCustomerData } = useQuery(CUSTOMERS_USED_BY_COMMERCIAL_PROJECTSV10)
  if (apiSalesmenLoading) return null
  if (apiCustomerLoading) return null
  const salesmen = apiSalesmenData.salesmenUsedByCommercialProjectsV10
  const customers = apiCustomerData.customersUsedByCommercialProjectsV10

  const outsideSalesmen = [...new Map(customers.map(customer => customer.salesRef).map(item =>
    [item.id, item])).values()]
  return (
    <DropDownContext.Provider value={{ salesmen, customers, outsideSalesmen }}>{children}</DropDownContext.Provider>
  )
}

const useDrowDown = () => useContext(DropDownContext)

export { DropDownProvider, useDrowDown }
