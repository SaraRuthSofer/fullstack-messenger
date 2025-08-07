const express = require('express')
const service = require('../services/chatsService')
const { sendMessageToUsers } = require('../handlers/websocketHandlers')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const chats = await service.getAllChats()
        res.json(chats)
    }
    catch (error) {
        next(error)
    }
})
router.get('/:memberId', async (req, res, next) => {
    try {
        const { memberId } = req.params
        const chats = await service.getChatsByMemberID(memberId)
        res.json(chats)
    }
    catch (error) {
        next(error)
    }
})
router.post('/', async (req, res, next) => {
    try {
        const data = req.body
        const r = await service.createChat(data)
        
        if (r.members && r.members.length > 0) {
            await sendMessageToUsers({
                message: r.toObject(),
                userIds: r.members,
                messageType: "new_chat"
            });
        }
        res.json(r)
    }
    catch (error) {
        next(error)
    }
})
router.put('/:chatId/:userId', async (req, res, next) => {
    try {
        const { chatId, userId } = req.params

        const chats = await service.removeChatMember(chatId, userId)
        res.json(chats)
    }
    catch (error) {
        next(error)
    }
})

module.exports = router



