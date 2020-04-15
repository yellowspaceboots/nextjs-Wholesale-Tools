import { gql } from '@apollo/client'

export const GET_ALL_FILES = gql`
  query ReadFiles {
    allFiles {
      data {
        content
        confidential
        owner {
          username
          role
          _id
        }
      }
    }
  }
`
