import mongoose from 'mongoose'
import './connection'

var bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },

  serviceType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'services',
    required: true
  },

  deliveryMethod: {
    type: String,
    required: true
  },

  dateTime: {
    type: Date,
    required: true
  },

  message: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  canceled: {
    type: Boolean,
    default: false
  }
})

if (!mongoose.modelNames().includes('bookings')) {
  mongoose.model('bookings', bookingSchema)
}

export default mongoose.model('bookings')
