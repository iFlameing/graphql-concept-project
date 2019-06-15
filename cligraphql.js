const { graphql, buildSchema } = require('graphql')

const db = {
    users: [
        {id: '1', email:"guest@gmail.com", name:'rohit', avatarUrl:'https://www.google.com'},
        {id: '2', email:"guest1@gmail.com", name:'rohit1', avatarUrl:'https://www.google.com'}
    ]
}

const schema = buildSchema(`
    type Query {
        users: [User!]!
    }
    type User {
        id:ID!
        email:String!
        name:String
        avatarUrl:String
    }
`)

const rootValue = {
    message: () => 'GraphqlWorks',
    users:() => db.users
 }

graphql(
    schema,`
    {
        users {
            email
            name
        }
    }
    `,
    rootValue
).then(
    res => console.dir(res, { depth: null})
).catch (
    console.error
)