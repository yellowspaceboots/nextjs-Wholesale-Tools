import { gql } from '@apollo/client'

export const UPDATE_CUSTOMER_PROJECT_STATE = gql`
  mutation UpdateCustomerProjectState($id: ID!, $data: CustomerProjectStateInput!) {
    updateCustomerProjectState(id: $id, data: $data) {
      _id
      status
      amount
      note
    }
  }
`
