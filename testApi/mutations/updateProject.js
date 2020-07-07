import { gql } from '@apollo/client'

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
            _id
            title
            amount
            dateDue
            dateEdited
            description
            editedBy {
              name
            }
            status
            size
            salesRef {
                name
                number
            }
    }
  }
`
