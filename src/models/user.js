import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'

const user = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: email => User.doesntexist({ email }),
      message: ({ value }) => `Email ${value} is already taken`
    }
  },
  username: {
    type: String,
    validate: {
      validator: username => User.doesntexist({ username }),
      message: ({ value }) => `username ${value} is already taken`
    }
  },
  name: String,
  password: String,
  createdAt: String
}, {
  timestamps: true
})

user.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

user.statics.doesntexist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

user.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}

const User = mongoose.model('User', user)

export default User
