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
export const ADD_NEW_CUSTOMERV10 = gql`
  mutation AddNewCustomerV10($input: AddNewCustomerInput!) {
    addNewCustomerV10(input: $input) {
        id
        name
        account
        usedByCommercial
    }
  }
`