import { gql } from '@apollo/client'

export const UPDATE_SALESMAN = gql`
  mutation UpdateSalesmen($id: ID!, $data: SalesmenInput!) {
    updateSalesmen(id: $id, data: $data) {
      _id
      number
      usedByCommercial
    }
  }
`

export const UPDATE_SALESMANV10 = gql`
  mutation UpdateSalesmenV10($id: ID!, $data: SalesmenInput!) {
    updateSalesmenV10(id: $id, data: $data) {
      id
      number
      usedByCommercial
    }
  }
`
