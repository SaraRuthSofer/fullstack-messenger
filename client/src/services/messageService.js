import axios from 'axios'


const API_URL = 'http://localhost:3000/messages'

const getAllMessages = async () => {
    return await axios.get(API_URL)
}
const getMessagesByChatID = async (chatId) => {
    return await axios.get(`${API_URL}/${chatId}`)

}

export default { getAllMessages, getMessagesByChatID }