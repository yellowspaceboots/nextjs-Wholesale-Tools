import { gql } from '@apollo/client'

export const CUSTOMERS_USED_BY_COMMERCIAL_PROJECTS = gql`
  query CustomersUsedByCommercialProjects {
    customersUsedByCommercialProjects(_size: 300) {
      data {
        _id
        account
        name
        storeNumber
        usedByCommercial
        salesRef {
          _id
          name
          number
        }
      }
    }
  }
`
