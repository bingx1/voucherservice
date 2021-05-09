import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    type: Number,
    required: true,
    trim: true
  },
  invoiceName: {
    type: String,
    trim: true
  },
  billEmail: {
    type: String,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
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
  mongoose.model('users').createIndexes()
}

export default mongoose.model('users')
