import { gql } from '@apollo/client'

export const GET_ACTIVE_PROJECTS = gql`
  query GetActiveProjects {
    getActiveProjects(active: true) {
      data {
        _id
        title
        salesRef {
            name
        }
      }
    }
  }
`
