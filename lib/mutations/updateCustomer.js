import { gql } from '@apollo/client'

export const UPDATE_CUSTOMERS = gql`
  mutation UpdateCustomers($id: ID!, $data: CustomersInput!) {
    updateCustomers(id: $id, data: $data) {
      _id
      account
      usedByCommercial
    }
  }
`

export const UPDATE_CUSTOMERSV10 = gql`
  mutation UpdateCustomersV10($id: ID!, $data: CustomersInput!) {
    updateCustomersV10(id: $id, data: $data) {
      id
      account
      usedByCommercial
    }
  }
`
