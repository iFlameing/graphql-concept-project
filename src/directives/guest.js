import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { checkSignOut } from '../auth'

class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = function (...args) {
      const [ , , context ] = args

      checkSignOut(context.req)

      return resolve.apply(this, args)
    }
  }
}

export default GuestDirective
