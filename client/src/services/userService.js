import axios from 'axios'


const API_URL = 'http://localhost:3000/users'

const getAllUsers = async () => {
    return await axios.get(API_URL)
}

export default { getAllUsers }