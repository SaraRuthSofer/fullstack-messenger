const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    status: {
        type: String,
        required: true,
        default: 'online'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
},
    { versionKey: false }
)

const User = mongoose.model('user', userSchema, 'users')
module.exports = User