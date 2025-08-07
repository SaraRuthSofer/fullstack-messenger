const initialState = {
    messagesByChat: {},
    loadedChats: [],
    loading: false,
    error: null
}

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT_USER':
            return {
                messagesByChat: {},
                loadedChats: [],
                loading: false,
                error: null
            }
        case 'LOAD_CHAT_MESSAGES':
            return {
                ...state,
                messagesByChat: {
                    ...state.messagesByChat,
                    [action.payload.chatId]: action.payload.messages
                },
                loadedChats: state.loadedChats.includes(action.payload.chatId)
                    ? state.loadedChats
                    : [...state.loadedChats, action.payload.chatId]
            }

        // Add new message to specific chat
        case 'ADD_MESSAGE':
            const { chatId, message } = action.payload
            return {
                ...state,
                messagesByChat: {
                    ...state.messagesByChat,
                    [chatId]: state.messagesByChat[chatId]
                        ? [...state.messagesByChat[chatId], message]
                        : [message]
                }
            }
        default:
            return state;
    }
}

export default messageReducer