const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }],
    isGroup: {
        type: Boolean,
        default: false
    },
    groupName: {
        type: String,
        required: function () { return this.isGroup }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
}, { versionKey: false })

const Chat = mongoose.model('chat', chatSchema, 'chats')
module.exports = Chat