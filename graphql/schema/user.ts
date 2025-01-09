import { gql } from "apollo-server-express";

const User = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        username: String
        email: String
        password: String
        phone: String
        address: String
        isActive: Boolean
        imageUrl: String
        token: String
        provider: [Provider]
        createdAt: String
        updatedAt: String
    }

    type UserProfile {
        _id: String
        firstName: String
        lastName: String
        username: String
        email: String
        address: String
        imageUrl: String
        phone: String
        isActive: Boolean
    }
`

const UserInput = gql`
    input UpdateProviderInput {
        firstName: String
        lastName: String
        email: String
        provider: String
    }

    input UserChangePasswordInput {
        currentPassword: String
        newPassword: String
    }

    input UserUpdateProfileInput {
        _id: String
        firstName: String
        lastName: String
        email: String
        username: String
        phone: String
        address: String
        isActive: Boolean
        imageUrl: String
    }
`

const UserQuery = gql`
    extend type Query{
        users: [User]
        user(_id: ID): User
        userProfile: UserProfile
    }
`

const UserMutation = gql`
    extend type Mutation {
        updateUserProvider(input: UpdateProviderInput!): AuthResponse
        updateUserProfile(input: UserUpdateProfileInput!): ResponseMessage
        changeUserPassword(input: UserChangePasswordInput!): AuthResponse
        deleteUser: ResponseMessage
    }
`

export default [User, UserQuery, UserInput, UserMutation]