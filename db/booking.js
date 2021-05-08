import mongoose from 'mongoose'

var bookingSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
})

if (!mongoose.modelNames().includes('bookings')) {
  mongoose.model('bookings', bookingSchema)
}
mongoose.model('bookings').createIndexes()

export default mongoose.model('bookings')
