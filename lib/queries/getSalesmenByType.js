import { gql } from '@apollo/client'

export const GET_SALESMEN_BY_TYPE = gql`
  query InsideSalesmen($type: String!) {
    getSalesmenByType(type: $type, _size: 500) {
      data {
        number
        name
        type
        store
      }
    }
  }
`
