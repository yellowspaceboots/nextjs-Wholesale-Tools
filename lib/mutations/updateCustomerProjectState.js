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
export const UPDATE_CUSTOMER_PROJECT_STATEV10 = gql`
  mutation UpdateCustomerProjectStateV10($id: ID!, $data: CustomerProjectStateInput!) {
    updateCustomerProjectStateV10(id: $id, data: $data) {
      id
      status
      amount
      note
    }
  }
`