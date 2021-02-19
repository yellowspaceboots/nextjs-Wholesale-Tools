import { gql } from '@apollo/client'

export const FIND_MANUFACTURERS_BY_ID = gql`
  query FindManufacturersById($id: ID!) {
    findManufacturersByID(id: $id) {
    name
    image {
      uri
      sizes {
        thumb {
          uri
        }
      }
    }
  }
  }
`
