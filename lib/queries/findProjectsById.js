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
export const FIND_PROJECTS_BY_IDV10 = gql`
  query FindProjectsByIdV10($id: ID!) {
    findProjectsByIDV10(id: $id) {
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