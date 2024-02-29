import { gql } from '@apollo/client'

export const DELETE_CUSTOMER_PROJECT_STATE = gql`
  mutation DeleteCustomerProjectState($id: ID!) {
    deleteCustomerProjectState(id: $id) {
        _id
    }
  }
`
export const DELETE_CUSTOMER_PROJECT_STATEV10 = gql`
  mutation DeleteCustomerProjectStateV10($id: ID!) {
    deleteCustomerProjectStateV10(id: $id) {
        id
    }
  }
`
