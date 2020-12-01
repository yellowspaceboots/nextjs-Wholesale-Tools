import { gql } from '@apollo/client'

export const GET_ME = gql`
  query GetMe {
    getMe {
        _id
        name
        role
        salesRef {
          _id
          number
          name
        }
      }
  }
`
