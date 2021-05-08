import mongoose from 'mongoose'

if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.DB_URL, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    })
}

import './user'
