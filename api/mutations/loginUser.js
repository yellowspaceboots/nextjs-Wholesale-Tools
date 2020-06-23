import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation LoginEmployeeUser($input: LoginUserInput) {
    loginUser(input: $input) {
      token
    }
  }
`
