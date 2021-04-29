import mongoose from 'mongoose'
import './user'

const connectDB = (handler) => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    await mongoose.connect('mongodb+srv://vservice:WfIPySE62fepvv5P@voucherservice.ygs4c.mongodb.net/voucherService', {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    })
    return handler(req, res)
}

export default connectDB