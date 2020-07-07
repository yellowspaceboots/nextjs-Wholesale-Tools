import { gql } from '@apollo/client'

export const FIND_PROJECTS_BY_ID = gql`
  query FindProjectsById($id: ID!) {
    findProjectsByID(id: $id) {
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
