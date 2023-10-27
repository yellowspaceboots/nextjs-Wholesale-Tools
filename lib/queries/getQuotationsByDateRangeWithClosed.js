import { gql } from '@apollo/client'

export const GET_QUOTATIONS_BY_DATE_RANGE_WITH_CLOSED = gql`
  query GetQuotationsByDateRangeWithClosed($input: DateRangeInput!) {
    getQuotationsByDateRangeWithClosed(input: $input) {
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
