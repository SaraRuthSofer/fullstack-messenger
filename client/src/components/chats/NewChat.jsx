import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userService from '../../services/userService'
import { setUsers } from '../../redux/actions/userAction'
import { useEffect, useState } from 'react'
import chatService from '../../services/chatService'
import { addChat } from '../../redux/actions/chatAction'

function NewChat({ onClose }) {
    const dispatch = useDispatch()

    const [selectedUser, setSelectedUser] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const users = useSelector(state => state.userReducer.users)
    const currentUser = useSelector(state => state.userReducer.user)

    const initUsers = async () => {
        try {
            const users = await userService.getAllUsers()
            if (users) {
                dispatch(setUsers(users.data))
            }
        }
        catch (error) {
            setError("Error loading users")
            console.log(error);
        }
    }

    const createChat = async () => {
        if (!selectedUser) {
            setError("Please select a user to start chat")
            return
        }

        setLoading(true)
        setError('')

        try {
            const obj = {
                members: [currentUser._id, selectedUser._id],
                isGroup: false
            }
            const res = await chatService.createChat(obj)
            if (res) {
                if (onClose) onClose()
            }
        }
        catch (error) {
            setError("Error creating chat")
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const filteredUsers = users ? users.filter(user =>
        user._id !== currentUser?._id && // Exclude current user
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : []

    useEffect(() => {
        if (!users)
            initUsers()
    }, [users])

    return (
        <div className="modal-overlay">
            <div className="modal w-400">
                {onClose && (
                    <button
                        onClick={onClose}
                        className="close-btn"
                    >
                        ×
                    </button>
                )}

                <h2>New Chat</h2>
                <p>Select a user to start conversation</p>

                {error && <div className="text-error">{error}</div>}

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="max-h-300 mb-15">
                    {!users ? (
                        <div className="loading">Loading users...</div>
                    ) : filteredUsers.length === 0 ? (
                        <p>No users found</p>
                    ) : (
                        filteredUsers.map(user => (
                            <div
                                key={user._id}
                                className={`list-item ${selectedUser?._id === user._id ? 'active' : ''}`}
                                onClick={() => setSelectedUser(user)}
                            >
                                <div className="list-item-title">{user.name}</div>
                                <div className="list-item-subtitle">{user.email}</div>
                                {selectedUser?._id === user._id && (
                                    <span className="check-icon">✓</span>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <button
                    onClick={createChat}
                    disabled={!selectedUser || loading}
                    className={`btn w-full mb-15 ${selectedUser && !loading ? 'btn-primary' : ''}`}
                >
                    {loading ? 'Creating Chat...' :
                        selectedUser ? `Start Chat with ${selectedUser.name}` : 'Select User'}
                </button>

                {onClose && (
                    <button
                        onClick={onClose}
                        className="btn w-full"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    )
}


export default NewChat
