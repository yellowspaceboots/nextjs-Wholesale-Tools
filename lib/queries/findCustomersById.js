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
