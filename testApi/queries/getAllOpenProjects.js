import { gql } from '@apollo/client'

export const GET_ALL_OPEN_PROJECTS = gql`
  query GetAllOpenProjects($cursor: String) {
    getAllOpenProjects(_size: 50, _cursor: $cursor) {
      after
      before
      data {
            _id
            title
            requestId
            amount
            dateDue
            dateEntered
            status
            size
            salesRef {
                name
                number
            }
            customerList {
                data {
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
      }
    }
  }
`
