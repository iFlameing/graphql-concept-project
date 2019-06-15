import Joi from 'joi'
const email = Joi.string().email().required().label('Email')
const name = Joi.string().max(254).required().label('Name')
const username = Joi.string().alphanum().min(4).max(30).required().label('Username')
const password = Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/).label('Password'
).options({
  language: {
    string: {
      regex: {
        base: 'must have atleast one lowercase uppercase and min length 8 character'
      }
    }
  }
})

export const signUp = Joi.object().keys({
  email, name, username, password
})
export const signIn = Joi.object().keys({
  email, password
})
