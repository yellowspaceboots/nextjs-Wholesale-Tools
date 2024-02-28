import { gql } from '@apollo/client'

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
            _id
            title
            amount
            dateDue
            dateDueDate
            dateEdited
            description
            editedBy {
              name
            }
            status
            size
            salesRef {
                _id
                name
                number
            }
    }
  }
`
export const UPDATE_PROJECTV10 = gql`
  mutation UpdateProjectV10($input: UpdateProjectInput!) {
    updateProjectV10(input: $input) {
            id
            title
            amount
            dateDue
            dateDueDate
            dateEdited
            description
            editedBy {
              name
            }
            status
            size
            salesRef {
                id
                name
                number
            }
    }
  }
`
