import mongoose from 'mongoose'
import Joi from 'joi'
import { UserInputError } from 'apollo-server-express'
import * as Auth from '../auth'
import { signUp, signIn } from '../Schemas'
import { User } from '../models'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      return User.findById(req.session.userId)
    },
    users: (root, args, { req }, info) => {
      return User.find({})
    },
    user: (root, { id }, { req }, info) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        UserInputError(`$id is nat a valid UserId`)
      }
      return User.findById(id)
    }

  },
  Mutation: {
    signup: async (root, args, { req }, info) => {
      await Joi.validate(args, signUp, { abortEarly: false })
      const user = await User.create(args)
      req.session.userId = user.id
      return user
    },
    signIn: async (root, args, { req }, info) => {
      await Joi.validate(args, signIn, { abortEarly: false })
      const user = await Auth.attemptSignIn(args.email, args.password)
      req.session.userId = user.id
      return user
    },
    signOut: (root, args, { req, res }, info) => {
      Auth.checkSignIn(req)
      return Auth.signOut(req, res)
    }
  }
}
