import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { checkSignIn } from '../auth'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = function (...args) {
      const [ , , context ] = args

      checkSignIn(context.req)

      return resolve.apply(this, args)
    }
  }
}

export default AuthDirective
