import { gql } from '@apollo/client'

export const GET_ALL_OPEN_PROJECTS = gql`
  query GetAllOpenProjects($cursor: String, $statusPage: String!) {
    getAllOpenProjects(statusPage: $statusPage, _size: 50, _cursor: $cursor) {
      after
      before
      data {
            _id
            title
            requestId
            amount
            dateDue
            dateDueDate
            dateEntered
            status
            size
            salesRef {
                _id
                name
                number
            }
            customerList {
                data {
                status
                amount
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
      }
    }
  }
`
export const GET_ALL_OPEN_PROJECTSV10 = gql`
  query GetAllOpenProjectsV10($statusPage: String!) {
    getAllOpenProjectsV10(statusPage: $statusPage) {
      id
      title
      requestId
      description
      amount
      dateDue
      dateDueDate
      dateEntered
      status
      size
      salesRef {
          id
          name
          number
      }
      customerList {
          status
          amount
          customerRef {
              id
              name
              account
              salesRef {
              id
              name
              number
              }
          }
          }
      }
  }
`
