import { gql } from '@apollo/client'

export const GET_QUOTATIONS_BY_DATE_RANGE = gql`
  query GetQuotationsByDateRange($input: DateRangeInput!) {
    getQuotationsByDateRange(input: $input) {
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
export const GET_QUOTATIONS_BY_DATE_RANGEV10 = gql`
  query GetQuotationsByDateRangeV10($input: DateRangeInput!) {
    getQuotationsByDateRangeV10(input: $input) {
        id
        title
        requestId
        amount
        dateDue
        dateEntered
        status
        size
        salesRef {
          id
          number
          name
        }
        customerList {
          id
          amount
          status
          customerRef {
            id
            account
            name
          }
        }
}
  }
`
