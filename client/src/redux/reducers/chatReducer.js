
const initialState = {
    chats: null
}

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CHATS':
            return { ...state, chats: action.payload }
        case 'ADD_CHAT':
            return { ...state, chats: [...state.chats, action.payload] }
        case 'UPDATE_CHAT':
            return {
                ...state,
                chats: state.chats.map(chat =>
                    chat._id === action.payload.id ? action.payload : chat
                )
            }
        case 'REMOVE_CHAT':
            return {
                ...state,
                chats: state.chats.filter(chat =>
                    chat._id !== action.payload
                )
            }
        case 'LOGOUT_USER':
            return {
                chats: null
            }

        default:
            return state;
    }
}
