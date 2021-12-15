import { gql } from '@apollo/client'

export const GET_QUOTATION_COUNTS = gql`
  query GetQuotationCounts($input: QuotationQueryInput!) {
    getQuotationCounts(input: $input) {
      open
      pending
      closed
      today
      thisWeek
      thisMonth
      pastDue
    }
  }
`
