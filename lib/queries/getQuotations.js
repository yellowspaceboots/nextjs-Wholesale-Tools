import { gql } from '@apollo/client'

export const GET_QUOTATIONS = gql`
  query GetQuotations($cursor: String, $input: QuotationQueryInput!) {
    getQuotations(input: $input, _size: 50, _cursor: $cursor) {
      after
      before
      data {
            _id
            title
            requestId
            description
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
export const GET_QUOTATIONSV10 = gql`
  query GetQuotationsV10($input: QuotationQueryInput!) {
    getQuotationsV10(input: $input) {
      before
      after
      data {
            id
            title
            requestId
            description
            amount
            dateDue
            dateDueDate
            dateEntered
            status
            size
            salesRef {
                id
                name
                number
            }
            customerList {
                status
                amount
                customerRef {
                    id
                    name
                    account
                    salesRef {
                    id
                    name
                    number
                    }
                }
                }
            }
      }
    }

`
