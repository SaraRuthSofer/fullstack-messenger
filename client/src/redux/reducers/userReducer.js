
const initialState = {
    user: null,
    users: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload }
        case 'SET_USERS':
            return { ...state, users: action.payload }
        case 'ADD_USER':
            return { ...state, users: [...state.users, action.payload] }
        case 'LOGOUT_USER':
            return {
                user: null, users: null
            }
        default:
            return state;
    }
}
