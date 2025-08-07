import axios from 'axios'

const API_URL = 'http://localhost:3000/auth'

const login = async (loginDate) => {
    const response = await axios.post(`${API_URL}/login`, loginDate)
    return response
}
const register = async (userDate) => {
    const response = await axios.post(`${API_URL}/register`, userDate)
    return response
}


export default { login, register }