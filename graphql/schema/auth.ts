import { gql } from "apollo-server-express";

const Auth = gql`
  type AuthResponse {
    userId: String!
    email: String!
    token: String!
  }

  type Provider {
    type: String
  }

  type ResponseMessage {
    isSuccess: Boolean
    message: String
    type: String
    data: JSON
  }
`

const AuthInput = gql`
    input LoginInput {
        email: String
        password: String
    }
    input RegisterInput {
        email: String
        password: String
        username: String
    }
    input ResetInput {
        email: String
        password: String
    }
`

// const AuthQuery = gql`
//     extend type Query{
//        #Auth Queries
//     }
// `

const AuthMutation = gql`
    extend type Mutation {
      register(input: RegisterInput!): AuthResponse
      login(input: LoginInput!): AuthResponse
      resetPassword(input: ResetInput!): AuthResponse
    }
`

export default [
  Auth,
  // AuthQuery,
  AuthInput,
  AuthMutation]