import { gql } from '@apollo/client'

export const UPDATE_COMMENTS = gql`
  mutation UpdateComments($id: ID!, $data: CommentsInput!) {
    updateComments(id: $id, data: $data) {
      _id
    }
  }
`
export const UPDATE_COMMENTSV10 = gql`
  mutation UpdateCommentsV10($id: ID!, $data: CommentsInput!) {
    updateCommentsV10(id: $id, data: $data) {
      id
    }
  }
`
