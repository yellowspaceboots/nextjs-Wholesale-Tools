import { gql } from '@apollo/client'

export const PROJECT_SEARCHV2 = gql`
  query ProjectSearchV2($input: String!) {
    projectSearchV2(input: $input, _size: 10) {
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
                    }
                }
            }
      }
  }
  }
`
