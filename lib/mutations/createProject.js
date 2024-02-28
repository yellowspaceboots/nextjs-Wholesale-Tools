import { gql } from '@apollo/client'

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput) {
    createProject(input: $input) {
        title
        salesRef {
            _id
            name
        }
    }
  }
`

export const CREATE_PROJECTV10 = gql`
  mutation CreateProjectV10($input: CreateProjectInput) {
    createProjectV10(input: $input) {
      id
      title
      requestId
      amount
      dateDue
      dateEntered
      status
      size
      salesRef {
        id
        name
        number
      }
      customerList {
        id
        amount
        status
        customerRef {
          id
          account
          name
        }
      }
  }
  }
`
