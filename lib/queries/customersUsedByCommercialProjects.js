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

export const CUSTOMERS_USED_BY_COMMERCIAL_PROJECTSV10 = gql`
  query CustomersUsedByCommercialProjectsV10 {
    customersUsedByCommercialProjectsV10 {
        id
        account
        name
        storeNumber
        usedByCommercial
        salesRef {
          id
          name
          number
        }
    }
  }
`