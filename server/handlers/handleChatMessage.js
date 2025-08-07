const messageService = require('../services/messagesService')
const chatService = require("../services/chatsService")
const usersService = require("../services/usersService")

const handleChatMessage = async (message, userInfo) => {
    try {
        message.senderId = userInfo.userId;

        const res = await messageService.createMessages(message);
        const chats = await chatService.getAllChats({ _id: message.chatId });

        if (!chats || chats.length === 0) {
            console.log("Chat not found for chatId:", message.chatId);
            return null;
        }

        // Get the first (and should be only) chat from the array
        const chat = chats[0];

        // Check if user is a member of the chat
        if (!chat.members || !chat.members.includes(userInfo.userId)) {
            console.log("User not authorized for this chat " + userInfo.userId);
            console.log("Chat members:", chat.members);
            return null;
        }

        return {
            message: res.toObject(), 
            userIds: chat.members, 
            messageType: "chat_message" 
        }

    } catch (error) {
        console.error("Error handling chat message:", error);
        return null;
    }
}
module.exports = {handleChatMessage}