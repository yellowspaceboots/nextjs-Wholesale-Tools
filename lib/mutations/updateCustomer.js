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
