import axios from 'axios'


const API_URL = 'http://localhost:3000/chats'

const getAllChats = async () => {
    return await axios.get(API_URL)
}
const getChatsByUserID = async (id) => {
    return await axios.get(`${API_URL}/${id}`)

}
const createChat = async (data) => {
    return await axios.post(API_URL, data)

}
const leaveChat = async (chatId, userId) => {
    return await axios.put(`${API_URL}/${chatId}/${userId}` )

}
export default { getAllChats, getChatsByUserID, createChat, leaveChat }