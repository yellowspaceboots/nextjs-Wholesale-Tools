import { gql } from '@apollo/client'

export const CREATE_SALESMEN = gql`
mutation CreateSalesmen($data: SalesmenInput!) {
  createSalesmen(data: $data) {
    _id
    name
    number
    store
    type
    usedByCommercial
  }
}
`
export const CREATE_SALESMENV10 = gql`
mutation CreateSalesmenV10($data: SalesmenInput!) {
  createSalesmenV10(data: $data) {
    id
    name
    number
    store
    type
    usedByCommercial
  }
}
`
