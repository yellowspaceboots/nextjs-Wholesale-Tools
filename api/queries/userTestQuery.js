import { gql } from '@apollo/client'

export const USER_TEST = gql`
  query UserTest {
    getUser {
        salesRef {
            number
        }
    }
  }
`
