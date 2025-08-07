const messageRepo = require('../repositories/messageRepo')


const getAllMessages = async (filter) => {
    try {
        const message = await messageRepo.getAll(filter)
        return message
    }
    catch (error) { throw error }
}
const getMessagesByChatId = async (chatId) => {
    try {
        const message = await getAllMessages({ chatId })
        return message
    }
    catch (error) { throw error }
}
const createMessages = async (message) => {
    try {
        const result = await messageRepo.create(message)
        return result
    }
    catch (error) { throw error }
}

module.exports = { getAllMessages, getMessagesByChatId, createMessages }