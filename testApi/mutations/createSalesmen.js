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
