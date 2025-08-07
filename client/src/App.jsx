import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Main from './components/layout/Main'
import GroupList from './components/groups/GroupList'
import { logoutUser } from './redux/actions/userAction'
import './styles/app.css'
import useWebsocketService from './services/websocketService'

function App() {
  const dispatch = useDispatch()
    const navigate = useNavigate()

  const user = useSelector(state => state.userReducer.user)
  const token = user?.token || localStorage.getItem('token')

  useWebsocketService(token)

  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <div className="app">
      {user && (
        <nav className="navbar">
          <div className="navbar-left">
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3>Hi {user.name}, Welcome to Messenger</h3>
          </div>

          <div className="navbar-right">
            <button onClick={() => navigate('/')} className="btn"> Chats </button>
            <button onClick={() => navigate('/groups')} className="btn">  Groups </button>
            <button onClick={logout} className="btn"> Logout </button>
          </div>
        </nav>
      )}

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/groups' element={<GroupList />} />
      </Routes>
    </div>
  )
}

export default App









