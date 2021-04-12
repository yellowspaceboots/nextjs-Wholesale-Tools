import { gql } from '@apollo/client'

export const ADD_NEW_CUSTOMER = gql`
  mutation AddNewCustomer($input: AddNewCustomerInput!) {
    addNewCustomer(input: $input) {
        _id
        name
        account
        usedByCommercial
    }
  }
`
