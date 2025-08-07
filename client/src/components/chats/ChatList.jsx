import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatReducer } from '../../redux/reducers/chatReducer'
import chatService from '../../services/chatService'
import { removeChat, setChats } from '../../redux/actions/chatAction'
import { setUsers } from '../../redux/actions/userAction'
import userService from '../../services/userService'
import NewChat from './NewChat'
import NewGroup from '../groups/NewGroup'

function ChatList({ activeChatId, setActiveChatId }) {
    const dispatch = useDispatch()

    const chats = useSelector(state => state.chatReducer.chats)
    const user = useSelector(state => state.userReducer.user)
    const users = useSelector(state => state.userReducer.users)
    const [openNewChat, setOpenNewChat] = useState(false)
    const [openNewGroup, setOpenNewGroup] = useState(false)

    const initChats = async () => {
        try {
            const ch = await chatService.getChatsByUserID(user._id)
            if (ch)
                dispatch(setChats(ch.data))
        }
        catch (error) {
            alert("Error fetching data")
            console.error(error);
        }
    }

    const initUsers = async () => {
        try {
            const users = await userService.getAllUsers()
            if (users) {
                dispatch(setUsers(users.data))
            }
        }
        catch (error) {
            alert("Error fetching data")
            console.log(error);
        }
    }

    const getUserNameById = (userId) => {
        if (!users || !userId) return 'Unknown User'
        const foundUser = users.find(x => x._id === userId)
        return foundUser ? foundUser.name : 'Unknown User'
    }

    const getChatDisplayName = (chat) => {
        if (chat.isGroup) {
            return chat.groupName || 'Unnamed Group'
        }
        const otherUserId = chat.members?.find(memberId => memberId !== user._id)
        return otherUserId ? getUserNameById(otherUserId) : 'Unknown Chat'
    }

    const blockUser = async(id) => {
       try {
            const res = await chatService.leaveChat(id, user._id)
            if (res)
            dispatch(removeChat(id))
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!chats)
            initChats()
        if (!users)
            initUsers()
    }, [chats, users])

    if (!chats || !users) {
        return <div className="loading">Loading chats...</div>
    }

    // const [hoveredChatId, setHoveredChatId] = useState(null);

    return (
        <div className="chat-list">
            <h2>Chats</h2>
            <div className="chat-list-buttons">
                <button onClick={() => setOpenNewChat(true)} className="btn btn-primary">New Chat</button>
                <button onClick={() => setOpenNewGroup(true)} className="btn btn-primary">New Group</button>
            </div>

            {chats.length === 0 ? (
                <div className="welcome-state">
                    <p>No chats yet</p>
                </div>
            ) : (
                chats.map((c) => (
                    <div
                        key={c._id}
                        onClick={() => setActiveChatId(c._id)}
                        className={`chat-item ${activeChatId === c._id ? 'active' : ''}`}
                        // onMouseEnter={() => setHoveredChatId(c._id)}
                        // onMouseLeave={() => setHoveredChatId(null)}
                    >
                        <div className="chat-item-name">{getChatDisplayName(c)}</div>
                        {c.isGroup && <div className="chat-item-info">Group - {c.members?.length || 0} members</div>}
                        {/* {hoveredChatId === c._id && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    blockUser(c._id);
                                }}
                                className="btn btn-danger"
                            >
                                Block User
                            </button>
                        )} */}
                    </div>
                ))
            )}

            {openNewChat && <NewChat onClose={() => setOpenNewChat(false)} />}
            {openNewGroup && <NewGroup onClose={() => setOpenNewGroup(false)} />}
        </div>
    )
}

export default ChatList
