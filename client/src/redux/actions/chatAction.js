export const setChats = (chats) => ({
    type: 'SET_CHATS', payload: chats
})
export const addChat = (chat) => ({
    type: 'ADD_CHAT', payload: chat
})
export const updateChat = (id, chat) => ({
    type: 'UPDATE_CHAT', payload: { id, chat }
})
export const removeChat = (id) => ({
    type: 'REMOVE_CHAT', payload: id
})



