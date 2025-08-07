import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ChatList from '../chats/ChatList'
import ChatWindow from '../chats/ChatWindow'

function Main() {

  const navigate = useNavigate()

  const user = useSelector(state => state.userReducer.user)
  const [activeChatId, setActiveChatId] = useState(null)

  useEffect(() => {
    if (!user)
      navigate('/login')
  }, [user])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="main-container">
      <div className="chat-layout">
        <div className="chat-sidebar">
          <ChatList activeChatId={activeChatId} setActiveChatId={setActiveChatId} />
        </div>
        <div className="chat-main">
          <ChatWindow chatId={activeChatId} />
        </div>
      </div>
    </div>
  )
}

export default Main
