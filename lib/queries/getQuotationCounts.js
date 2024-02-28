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
export const GET_QUOTATION_COUNTSV10 = gql`
  query GetQuotationCountsV10($input: QuotationQueryInput!) {
    getQuotationCountsV10(input: $input) {
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
