export const loadChatMessages = (chatId, messages) => (
    {
        type: 'LOAD_CHAT_MESSAGES',
        payload: { chatId, messages }
    }
)
export const addMessage = (chatId, message) => (
    {
        type: 'ADD_MESSAGE',
        payload: { chatId, message }
    })
export const newChatMessage = (chatId, message) => (
    {
        type: 'ADD_MESSAGE',
        payload: { chatId, message }
    })
