import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

var userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 8}
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