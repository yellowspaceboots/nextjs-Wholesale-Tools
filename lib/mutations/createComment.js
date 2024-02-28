import { gql } from '@apollo/client'

export const CREATE_COMMENT = gql`
mutation CreateComments($data: CommentsInput!) {
  createComments(data: $data) {
    _id
    message
    dateCreated
    replyTo
    edited
    user {
      name
    }
  }
}
`
export const CREATE_COMMENTV10 = gql`
mutation CreateCommentsV10($data: CommentsInput!) {
  createCommentsV10(data: $data) {
    id
    message
    dateCreated
    replyTo
    edited
    user {
      name
    }
  }
}
`
