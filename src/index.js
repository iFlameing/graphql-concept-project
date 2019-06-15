import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'


mongoose.connect('mongodb://localhost/mychatapp', {
  useNewUrlParser: true
}) // "mongodb://localhost/yelp_camp_v12"

const {
  APP_PORT = 4000
} = process.env

const app = express()
const RedisStore = connectRedis(session)

const REDIS_OPTIONS = {
  host: 'redis-12509.c8.us-east-1-3.ec2.cloud.redislabs.com',
  port: +12509,
  pass: 'KM9ZL8a1rwL7gsj89LWmi8ksCKPAzsdP'
}
const store = new RedisStore(REDIS_OPTIONS)
app.disable('x-powered-by')
app.use(session({
  store,
  name: 'chatApp',
  secret: 'this is a secret',
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: parseInt(1000 * 60 * 60 * 2),
    sameSite: true
  }
}))
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  playground: {
    settings: {
      'request.credentials': 'include'
    }
  },
  context: ({ req, res }) => ({ req, res })
})

server.applyMiddleware({ app })

app.listen({ port: APP_PORT }, () => console.log('Server is listing on 4000'))
