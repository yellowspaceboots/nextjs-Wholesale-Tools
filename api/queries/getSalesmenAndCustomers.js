import { gql } from '@apollo/client'

export const GET_SALESMEN_AND_CUSTOMERS = gql`
  query GetSalesmenAndCustomers {
    getAllSalesmen(_size: 500) {
      data {
        number
        name
        type
        store
      }
    }
    getAllCustomers(_size: 4000) {
      data {
        _id
        account
        name
      }
    }
  }
`
