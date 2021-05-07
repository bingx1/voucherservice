import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  invoiceName: {
    type: String,
    required: false
  },
  billEmail: {
    type: String,
    required: false
  }
})

userSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = bcrypt.hashSync(user.password, 8)
  }
  next()
})

if (!mongoose.modelNames().includes('users')) {
  mongoose.model('users', userSchema)
}

export default mongoose.model('users')
