import { gql } from '@apollo/client'

export const GET_ALL_PENDING_PROJECTS = gql`
  query GetAllPendingProjects {
    getAllPendingProjects(_size: 500) {
      data{
            _id
            title
            requestId
            amount
            dateDue
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
      }
    }
  }
`
