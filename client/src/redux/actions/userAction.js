export const setUser = (user) => ({
    type: 'SET_USER', payload: user
})
export const setUsers = (users) => ({
    type: 'SET_USERS', payload: users
})
export const logoutUser = () => ({
    type: 'LOGOUT_USER', payload: null
})
export const addUser = (user) => ({
    type: 'ADD_USER', payload: user
})


