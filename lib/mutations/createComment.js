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
