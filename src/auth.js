import { AuthenticationError } from 'apollo-server-express'
import { User } from './models'

export const attemptSignIn = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new AuthenticationError(' Email or Password is Incorrrect ')
  }
  if (!await user.matchesPassword(password)) {
    throw new AuthenticationError('Email or password is incorrect')
  }
  return user
}

export const checkSignIn = req => {
  if (!req.session.userId) {
    throw new AuthenticationError('You Must SignedIn')
  }
}

export const checkSignOut = req => {
  if (req.session.userId) {
    throw new AuthenticationError('You Already SignedIn')
  }
}

export const signOut = (req, res) => new Promise((resolve, reject) => {
  req.session.destroy(err => {
    if (err) reject(err)

    res.clearCookie('chatApp')
    resolve(true)
  })
})
