import mongoose from 'mongoose'

var serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

if (!mongoose.modelNames().includes('services')) {
  mongoose.model('services', serviceSchema)
}
mongoose.model('services').createIndexes()

export default mongoose.model('services')
