import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userService from '../../services/userService'
import { setUsers } from '../../redux/actions/userAction'
import { useEffect, useState } from 'react'
import chatService from '../../services/chatService'
import { addChat } from '../../redux/actions/chatAction'

function NewGroup({ onClose }) {
    const dispatch = useDispatch()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [groupName, setGroupName] = useState('')
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

    const toggleUserSelection = (userId) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        )
    }

    const createGroup = async () => {
        if (!groupName.trim()) {
            setError("Please enter group name")
            return
        }

        if (selectedUsers.length === 0) {
            setError("Please select at least one user")
            return
        }

        setLoading(true)
        setError('')
        
        try {
            const obj = {
                members: [currentUser._id, ...selectedUsers],
                isGroup: true,
                groupName: groupName.trim()
            }
            const res = await chatService.createChat(obj)
            if (res) {
                if (onClose) onClose()
            }
        }
        catch (error) {
            setError("Error creating group")
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const filteredUsers = users ? users.filter(user =>
        user._id !== currentUser?._id && // Exclude current user
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : []

    const getUserNameById = (userId) => {
        const user = users?.find(u => u._id === userId)
        return user ? user.name : 'Unknown User'
    }

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

                <h2>New Group</h2>
                <p>Create a new chat group</p>

                {error && <div className="text-error">{error}</div>}

                <div className="form-group">
                    <label>Group Name:</label>
                    <input
                        type="text"
                        placeholder="Enter group name..."
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Search Users:</label>
                    <input
                        type="text"
                        placeholder="Search users to add..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {selectedUsers.length > 0 && (
                    <div className="form-group">
                        <label>Selected Users ({selectedUsers.length}):</label>
                        <div className="tags">{selectedUsers.map(userId => (
                                <span key={userId} className="tag">
                                    {getUserNameById(userId)}
                                    <button 
                                        onClick={() => toggleUserSelection(userId)}
                                        className="tag-remove"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="max-h-250 mb-15">
                    {!users ? (
                        <div className="loading">Loading users...</div>
                    ) : filteredUsers.length === 0 ? (
                        <p>No users found</p>
                    ) : (
                        filteredUsers.map(user => (
                            <div
                                key={user._id}
                                className={`list-item ${selectedUsers.includes(user._id) ? 'active' : ''}`}
                                onClick={() => toggleUserSelection(user._id)}
                            >
                                <div className="list-item-title">{user.name}</div>
                                <div className="list-item-subtitle">{user.email}</div>
                                {selectedUsers.includes(user._id) && (
                                    <span className="check-icon">✓</span>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <button
                    onClick={createGroup}
                    disabled={!groupName.trim() || selectedUsers.length === 0 || loading}
                    className={`btn w-full mb-15 ${(groupName.trim() && selectedUsers.length > 0 && !loading) ? 'btn-primary' : ''}`}
                >
                    {loading ? 'Creating Group...' : 
                     `Create Group${groupName ? ` "${groupName}"` : ''} (${selectedUsers.length} users)`}
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

export default NewGroup
