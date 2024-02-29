import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation LoginEmployeeUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
    }
  }
`
export const LOGIN_USERV10 = gql`
  mutation LoginEmployeeUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
    }
  }
`
