import { gql } from '@apollo/client'

export const DROP_DOWN_QUERY = gql`
  query DropDownQuery {
    customersUsedByCommercialProjects {
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
    salesmenUsedByCommercialProjects {
      data {
        _id
        number
        name
        store
        type
        usedByCommercial
      }
    }
  }
`
