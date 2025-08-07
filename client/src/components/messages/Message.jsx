import React from 'react'
import { useSelector } from 'react-redux';

function Message({ message }) {

    const users = useSelector(state => state.userReducer.users)
    const user = useSelector(state => state.userReducer.user)

    const isOwnMessage = message.senderId == user?._id;
    const formattedDate = new Date(message.timestamp).toLocaleString('en-US');


    const getUserNameById = (userId) => {
        if (!users || !userId) return 'Unknown User'
        const foundUser = users.find(x => x._id === userId)
        return foundUser ? foundUser.name : 'Unknown User'
    }

    return (
        <div className={`message ${isOwnMessage ? 'own' : 'other'}`}>
            <div className="message-bubble">
                <div className="message-header">
                    <strong>{isOwnMessage ? "You" : getUserNameById(message.senderId)}</strong>
                    <span>{formattedDate}</span>
                </div>
                <div>{message.content}</div>
            </div>
        </div>
    )
}

export default Message
