import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import chatService from '../../services/chatService'
import { useEffect } from 'react'
import userService from '../../services/userService'
import { useState } from 'react'
import { removeChat, setChats } from '../../redux/actions/chatAction'
import { setUsers } from '../../redux/actions/userAction'

function GroupList() {
    const dispatch = useDispatch()
    const chats = useSelector(state => state.chatReducer.chats)
    const users = useSelector(state => state.userReducer.users)
    const user = useSelector(state => state.userReducer.user)

    const [groups, setGroups] = useState([])
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
    const leaveGroup = async (id) => {
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

        else {
            const g = chats.filter(x => x.isGroup)
            setGroups(g)
        }

        if (!users)
            initUsers()

    }, [chats, users])
    return (
        <div className="group-list">
            <h2>Groups</h2>
            {!groups || groups.length === 0 ? (
                <div className="welcome-state">
                    <p>No groups yet</p>
                </div>
            ) : (
                groups.map(group => (
                    <div key={group._id} className="group-item">
                        <div className="group-header">
                            <h3 className="group-name">{group.groupName}</h3>
                            <button
                                onClick={() => leaveGroup(group._id)}
                                className="btn btn-danger"
                            >
                                Leave Group
                            </button>
            
                        </div>
                        <div className="group-members">
                            <h4>Members ({group.members?.length || 0}):</h4>
                            <div className="members-list">
                                {group.members && group.members.map((m, i) => (
                                    <span key={i} className="member-tag">
                                        {getUserNameById(m)}
                                    </span>
                                ))}
                            </div>
                     
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default GroupList
