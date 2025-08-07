import React from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { newChatMessage } from '../redux/actions/messageAction'
import { useDispatch } from 'react-redux'
import { addChat } from '../redux/actions/chatAction'
import { addUser } from '../redux/actions/userAction'

function useWebsocketService(token) {
    const WS_URL = `ws://localhost:3000`
    const dispatch = useDispatch()



    const { sendMessage, lastMessage, readyState } = useWebSocket(`${WS_URL}?token=${token}`, {
        onOpen: () => console.log('WebSocket Connected with token via query params:', !!token),
        onClose: () => console.log('WebSocket Disconnected'),
        onMessage: (event) => {
            console.log('Received message:', event.data)
            hadleMessage(event.data)
        },
        onError: (error) => console.error('WebSocket Error:', error)
    })


    const hadleMessage = (data) => {
        try {

            const parsedData = JSON.parse(data);
            if (parsedData.type == "chat_message")
                dispatch(newChatMessage(parsedData.chatId, parsedData))
            if (parsedData.type == "new_chat") {
                dispatch(addChat(parsedData))
            }
            if (parsedData.type == "new_user") {
                dispatch(addUser(parsedData))
            }
        } catch (err) {
            console.error("Failed to parse message data:", err);
        }

    }
    return { sendMessage, readyState }


}

export default useWebsocketService
