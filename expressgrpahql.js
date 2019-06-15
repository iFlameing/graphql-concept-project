const express = require('express')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const crypto = require('crypto')

const app = express()

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

const schema = buildSchema(`
    type Query {
        users: [User!]!
        user(id:ID!):User
        messages:[Messages!]!
    }
    type Mutation{
        addUser(email:String!,name:String):User
    }
    type User {
        id:ID!
        email:String!
        name:String
        avatarUrl:String
        messages:[Messages!]!
    }
    type Messages {
        id:ID!
        body: String!
        createdAt:String
    }
`)

class User{
    constructor(user){
        Object.assign(this, user)
    }

    messages(){
         return db.messages.filter(message=> message.id === this.id)
    }
}

const rootValue = {
    message: () => 'GraphqlWorks',  
    users:() => db.users.map(user => new User(user)),
    messages:() => db.messages,
    addUser:({email, name}) => {
        const user = {
            id: crypto.randomBytes(10).toString('hex'),
            email,
            name
        }
        db.users.push(user);
        return user
    },
    user: args => db.users.find(user => user.id === args.id)
 }

 app.use('/graphql',graphqlHttp({
     schema,
     rootValue,
     graphiql: true,
     
 }))

app.listen(2000, () => console.log('server listenign on 2000'));