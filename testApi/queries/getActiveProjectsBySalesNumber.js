import { gql } from '@apollo/client'

export const GET_ACTIVE_PROJECTS_BY_SALES_NUMBER = gql`
  query GetActiveProjectsBySalesNumber($salesman: String!, $active: Boolean!) {
    getActiveProjectsBySalesNumber(_size: 500, active: $active, salesman: $salesman) {
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
export const GET_ACTIVE_PROJECTS_BY_OUTSIDE_SALESMAN = gql`
  query GetActiveProjectsByOutsideSalesman($salesman: String!) {
    getActiveProjectsByOutsideSalesman(salesman: $salesman) {
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
