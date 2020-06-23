import { gql } from '@apollo/client'

export const ADD_CUSTOMERS_TO_PROJECT = gql`
  mutation AddCustomersToProject($input: AddCustomerToProjectInput!) {
    addCustomersToProject(input: $input) {
            _id
            title
            requestId
            amount
            dateDue
            dateEntered
            dateEdited
            description
            createdBy {
              name
            }
            editedBy {
              name
            }
            status
            size
            salesRef {
                name
                number
            }
            customerList {
                data {
                  _id
                status
                amount
                customerRef{
                    name
                    account
                    salesRef {
                    name
                    number
                    }
                }
                }
            }
            comments {
      data {
        _id
        dateCreated
        message
        edited
        replyTo
        user {
          _id
          name
        }
      }
    }
    }
  }
`
