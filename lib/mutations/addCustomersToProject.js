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
                _id
                name
                number
            }
            customerList {
                data {
                  _id
                status
                amount
                customerRef{
                    _id
                    name
                    account
                    salesRef {
                    _id
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

export const ADD_CUSTOMERS_TO_PROJECTV10 = gql`
  mutation AddCustomersToProjectV10($input: AddCustomerToProjectInput!) {
    addCustomersToProjectV10(input: $input) {
      id
      title
      requestId
      amount
      dateDue
      dateDueDate
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
        id
        number
        name
        store
        type
        usedByCommercial
      }
      customerList {
        id
        amount
        note
        status
        customerRef {
          id
          account
          name
          salesRef {
            id
            name
            number
          }
        }
      }
      comments {
        id
        dateCreated
        edited
        message
        replyTo
        user {
          id
          name
        }
      }
  }
}
`
