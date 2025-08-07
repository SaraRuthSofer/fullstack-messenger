const express = require('express')
const service = require('../services/messagesService')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const messages = await service.getAllMessages()
        res.json(messages)
    }
    catch (error) { next(error) }
})

router.get('/:chatId', async (req, res, next) => {
    try {
        const { chatId } = req.params
        const messages = await service.getMessagesByChatId(chatId)
        res.json(messages)
    }
    catch (error) { next(error) }
})


module.exports = router

