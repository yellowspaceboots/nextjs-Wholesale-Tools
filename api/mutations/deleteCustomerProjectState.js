import { gql } from '@apollo/client'

export const DELETE_CUSTOMER_PROJECT_STATE = gql`
  mutation DeleteCustomerProjectState($id: ID!) {
    deleteCustomerProjectState(id: $id) {
        _id
    }
  }
`
