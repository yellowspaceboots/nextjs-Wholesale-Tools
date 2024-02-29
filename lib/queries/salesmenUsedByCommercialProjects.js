import { gql } from '@apollo/client'

export const SALESMEN_USED_BY_COMMERCIAL_PROJECTS = gql`
  query SalesmenUsedByCommercialProjects {
    salesmenUsedByCommercialProjects(_size: 300) {
      data {
        _id
        number
        name
        store
        type
        usedByCommercial
      }
    }
  }
`
export const SALESMEN_USED_BY_COMMERCIAL_PROJECTSV10 = gql`
  query SalesmenUsedByCommercialProjectsV10 {
    salesmenUsedByCommercialProjectsV10 {
        id
        number
        name
        store
        type
        usedByCommercial
    }
  }
`
