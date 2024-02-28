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
export const GET_MEV10 = gql`
  query GetMeV10 {
    getMeV10 {
        id
        name
        role
        salesRef {
          id
          number
          name
        }
      }
  }
`
