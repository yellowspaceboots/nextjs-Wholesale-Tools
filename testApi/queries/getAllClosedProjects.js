import { gql } from '@apollo/client'

export const GET_ALL_CLOSED_PROJECTS = gql`
  query GetAllClosedProjects {
    getAllClosedProjects(_size: 500) {
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
