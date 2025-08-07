    const mongoose = require('mongoose')


    const messageSchema = mongoose.Schema({

        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now,
            required: true
        }
    },
        { versionKey: false }
    )

    const Message = mongoose.model('message', messageSchema, 'messages')
    module.exports = Message