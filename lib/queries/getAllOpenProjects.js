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
