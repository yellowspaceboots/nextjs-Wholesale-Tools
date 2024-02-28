import { gql } from '@apollo/client'

export const FIND_CUSTOMERS_BY_ID = gql`
  query FindCustomersById($id: ID!) {
    findCustomersByID(id: $id) {
        _id
        name
        account
        salesRef {
          _id
          name
          number
        }
  }
  }
`

export const FIND_CUSTOMERS_BY_IDV10 = gql`
  query FindCustomersByIdV10($id: ID!) {
    findCustomersByIDV10(id: $id) {
        id
        name
        account
        salesRef {
          id
          name
          number
        }
  }
  }
`
