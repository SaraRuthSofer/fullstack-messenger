import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ReadyState } from 'react-use-websocket'
import useWebsocketService from '../../services/websocketService'

function NewMessage({ chatId }) {
    const [text, setText] = useState("")
    const user = useSelector(state => state.userReducer.user)
    const token = user?.token || localStorage.getItem('token')

    const { sendMessage, readyState } = useWebsocketService(token)

    const send = async (e) => {
        e.preventDefault()
        if (!text.trim()) return
        
        try {
            const messageObj = {
                type: "chat_message",
                chatId: chatId,
                content: text.trim()
            }

            // Send message via WebSocket
            if (readyState === ReadyState.OPEN) {
                sendMessage(JSON.stringify(messageObj))
                setText("")
            } else {
                console.error('WebSocket is not connected')
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            send(e)
        }
    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting...',
        [ReadyState.OPEN]: 'Connected',
        [ReadyState.CLOSING]: 'Disconnecting...',
        [ReadyState.CLOSED]: 'Disconnected',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState]

    return (
        <div className="message-input-container">
            <form onSubmit={send} className="message-input-form">
                <input
                    type="text"
                    value={text}
                    placeholder="Type a message..."
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="message-input"
                    disabled={readyState !== ReadyState.OPEN}
                />
                <button
                    type="submit"
                    disabled={readyState !== ReadyState.OPEN || !text.trim()}
                    title={connectionStatus}
                    className="send-button"
                >
                    Send
                </button>
            </form>
        </div>
    )
}

export default NewMessage
