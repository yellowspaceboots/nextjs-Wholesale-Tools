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
