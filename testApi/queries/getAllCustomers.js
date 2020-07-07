import { gql } from '@apollo/client'

export const GET_ALL_CUSTOMERS = gql`
  query AllCustomers {
    getAllCustomers(_size: 4000) {
      data {
        _id
        account
        name
      }
    }
  }
`
