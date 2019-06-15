import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        user(id:ID!):User @auth
        users: [User!]! @auth
        me: User @auth
    }

    extend type Mutation {
        signup(email:String!, username:String!, name: String!, password: String!): User @guest
        signIn(email: String!, password:String!): User @guest
        signOut: Boolean @auth

    }

    type User {
        id:ID!
        email:String!
        name: String!
        username: String!
        createdAt: String!
    }
`
