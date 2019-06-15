const { ApolloServer, gql} = require('apollo-server')
const crypto = require('crypto')

const db = {
    users: [
        {id: '1', email:"guest@gmail.com", name:'rohit', avatarUrl:'https://www.google.com'},
        {id: '2', email:"guest1@gmail.com", name:'rohit1', avatarUrl:'https://www.google.com'}
    ],
    messages: [
        {id:'1', authorid:'1', body:"this is from alok", createAt:Date.now()},
        {id:'2', authorid:'2', body:"this is from rohit", createAt:Date.now()}
    ]
}

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    messages: [Message!]!
  }
  type Mutation {
    addUser(email: String!, name: String): User!
  }
  type User {
    id: ID!
    email: String!
    name: String
    avatarUrl: String
    messages: [Message!]!
  }
  type Message {
    id: ID!
    body: String!
    createdAt: String!
  }
`


const resolvers = {
    Query: {
        users: () => db.users,
        messages:() => db.messages,
        user: (root,{ id }) => db.users.find(user => user.id === id)
    },
    Mutation: {
        addUser:(root, {email, name}) => {
            const user = {
                id: crypto.randomBytes(10).toString('hex'),
                email,
                name
            }
            db.users.push(user);
            return user
        }
    },
    User: {
        messages: user => db.messages.filter( message=> message.id === user.id)
    }

 }

 const server = new ApolloServer({ typeDefs, resolvers })
 server.listen().then( ({ url }) => console.log(url))