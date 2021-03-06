import { gql } from '@apollo/client'

export const GET_ACTIVE_PROJECTS = gql`
  query GetActiveProjects {
    getActiveProjects(_size: 800, active: true) {
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
