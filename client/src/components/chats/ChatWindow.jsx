import React from 'react'
import Message from '../messages/Message'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import messageService from '../../services/messageService'
import { loadChatMessages } from '../../redux/actions/messageAction'
import NewMessage from '../messages/NewMessage'

function ChatWindow({ chatId }) {
    const dispatch = useDispatch()
    
    const messageList = useSelector(state => state.messageReducer.messagesByChat[chatId])
    const chats = useSelector(state => state.chatReducer.chats)
    const users = useSelector(state => state.userReducer.users)
    const user = useSelector(state => state.userReducer.user)

    const initMessages = async () => {
        try {
            const mm = await messageService.getMessagesByChatID(chatId)            
            dispatch(loadChatMessages(chatId, mm.data))
        }
        catch (error) {
            console.error(error);
        }
    }

    const getCurrentChat = () => {
        return chats?.find(chat => chat._id === chatId)
    }

    const getChatDisplayName = (chat) => {
        if (!chat) return ''
        if (chat.isGroup) {
            return chat.groupName || 'Unnamed Group'
        }
        const otherUserId = chat.members?.find(memberId => memberId !== user._id)
        const otherUser = users?.find(u => u._id === otherUserId)
        return otherUser ? otherUser.name : 'Unknown User'
    }

    const getMembersCount = (chat) => {
        return chat?.members?.length || 0
    }

    useEffect(() => {
        if (!messageList && chatId)
            initMessages()        
    }, [messageList, chatId])

    if (!chatId) {
        return (
            <div className="welcome-state">
                <h3>Welcome to Messenger</h3>
                <p>Select a chat to start conversation</p>
            </div>
        )
    }

    const currentChat = getCurrentChat()

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h3>{getChatDisplayName(currentChat)}</h3>
                {currentChat?.isGroup && <p>{getMembersCount(currentChat)} members</p>}
            </div>

            <div className="messages-container">
                {!messageList ? (
                    <div className="loading">Loading messages...</div>
                ) : messageList.length === 0 ? (
                    <div className="welcome-state">
                        <p>No messages yet</p>
                    </div>
                ) : (
                    messageList.map((message, index) => (
                        <Message key={index} message={message} />
                    ))
                )}
            </div>

            <NewMessage chatId={chatId} />
        </div>
    )
}

export default ChatWindow

