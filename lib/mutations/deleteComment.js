import { gql } from '@apollo/client'

export const DELETE_COMMENTS = gql`
  mutation DeleteComments($id: ID!) {
    deleteComments(id: $id) {
        _id
    }
  }
`
