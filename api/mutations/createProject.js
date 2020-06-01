import { gql } from '@apollo/client'

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput) {
    createProject(input: $input) {
        requestId
        title
        description
        status
        dateEntered
        dateDue
        amount
        size
        salesman {
            number
            name
            type
            store
        }
        customerList {
            account
            keyAccountId
            name
            status
            salesman {
                number
                name
                type
                store
            }
        }
    }
  }
`
