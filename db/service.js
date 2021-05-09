import mongoose from 'mongoose'
import './connection'

var serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

if (!mongoose.modelNames().includes('services')) {
  mongoose.model('services', serviceSchema)
}

export default mongoose.model('services')
