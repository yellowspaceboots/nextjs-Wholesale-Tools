import { gql } from '@apollo/client'

export const GET_ALL_SALESMEN = gql`
  query AllSalesmen {
    getAllSalesmen(_size: 500) {
      data {
        _id
        number
        name
        store
        type
        usedByCommercial
      }
    }
  }
`

export const GET_ALL_SALESMENV10 = gql`
  query AllSalesmenV10 {
    getAllSalesmenV10 {
        id
        number
        name
        store
        type
        usedByCommercial
    }
  }
`
