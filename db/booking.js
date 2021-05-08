import mongoose from 'mongoose'

var bookingSchema = new mongoose.Schema({
  serviceType: {
    type: String,
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
  }
})

if (!mongoose.modelNames().includes('bookings')) {
  mongoose.model('bookings', bookingSchema)
  mongoose.model('bookings').createIndexes()
}

export default mongoose.model('bookings')
