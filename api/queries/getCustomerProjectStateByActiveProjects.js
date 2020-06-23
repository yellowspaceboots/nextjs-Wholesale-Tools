import { gql } from '@apollo/client'

export const GET_CUSTOMER_PROJECT_STATE_BY_ACTIVE_PROJECT = gql`
  query GetCustomerProjectStateByActiveProjects {
    getCustomerProjectStateByActiveProjects {
        data {
            _id
            status
            projectRef {
                _id
                dateEntered
            }
            customerRef {
                _id
                name
                account
            }
        }
    }
  }
`
