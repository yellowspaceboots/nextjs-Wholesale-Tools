import { gql } from '@apollo/client'

export const UPDATE_COMMENTS = gql`
  mutation UpdateComments($id: ID!, $data: CommentsInput!) {
    updateComments(id: $id, data: $data) {
      _id
    }
  }
`
