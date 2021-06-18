import { gql } from '@apollo/client'

export const FIND_PROJECTS_BY_ID = gql`
  query FindProjectsById($id: ID!) {
    findProjectsByID(id: $id) {
            _id
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
              _id
              number
              name
              store
              type
              usedByCommercial
            }
            customerList {
                data {
                  _id
                status
                amount
                note
                customerRef {
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
