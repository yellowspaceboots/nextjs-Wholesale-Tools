import { gql } from '@apollo/client'

export const GET_ALL_CUSTOMERS = gql`
  query AllCustomers {
    getAllCustomers(_size: 4000) {
      data {
        _id
        account
        storeNumber
        name
        usedByCommercial
        salesRef {
          _id
          name
        }
      }
    }
  }
`

export const GET_ALL_CUSTOMERSV10 = gql`
  query AllCustomersV10 {
    getAllCustomersV10 {
        id
        account
        storeNumber
        name
        usedByCommercial
        salesRef {
          id
          name
        }
    }
  }
`
