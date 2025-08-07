const chatRepo = require('../repositories/chatRepo')

const getAllChats = async (filter) => {
    try {
        return await chatRepo.getAll(filter)
    }
    catch (error) { throw error }
}


const getChatsByMemberID = async (memberId) => {
    try {
        const chats = await getAllChats()
        const filterChats = chats.filter((chat) => {
            return chat.members.includes(memberId)
        })
        return filterChats
    }
    catch (error) { throw error }

}

const createChat = async (data) => {
    try {
        const r = await chatRepo.create(data)
        return r
    }
    catch (error) { throw error }
}

const removeChatMember = async (chatId, userId) => {
    try {
        let chat = await chatRepo.getById(chatId)
        if (!chat)
            throw new Error("No chat found")
        chat.members = chat.members.filter(x => x != userId)
        console.log(chat);

        const res = await chatRepo.update(chatId, chat)
        return res
    }
    catch (error) { throw error }
}
module.exports = { getAllChats, createChat, getChatsByMemberID, removeChatMember }