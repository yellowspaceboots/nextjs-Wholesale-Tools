import { gql } from '@apollo/client'

export const ACTIVE_CUSTOMER_STATE = gql`
  query ActiveCustomerState {
    activeCustomerState(_size: 100000) {
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
                salesRef {
                  _id
                  number
                  name
                }
            }
        }
    }
  }
`
