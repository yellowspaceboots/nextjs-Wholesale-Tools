import { gql } from '@apollo/client'

export const CHANGE_CUSTOMER_SALESMAN = gql`
  mutation ChangeCustomerSalesman($input: ChangeCustomerSalesmanInput!) {
    changeCustomerSalesman(input: $input) {
        _id
        account
        name
        storeNumber
        usedByCommercial
        salesRef {
          _id
          name
          number
        }
      }
  }
`
