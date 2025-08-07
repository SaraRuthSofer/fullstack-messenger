import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/authService'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/actions/userAction'

function Login({ onClose, onSwitchToRegister }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUserData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        try {
            const res = await authService.login(user)
            if (res) {                
                dispatch(setUser(res.data))
                navigate('/')
                if (onClose) onClose()
            }
        }
        catch (error) {
            console.log(error);
            setError("Login error, please try again")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Login</h2>
                <p>Please enter your credentials</p>

                {error && <div className="text-error">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            autoComplete="email" 
                            value={user.email}
                            onChange={e => setUserData({ ...user, email: e.target.value })}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Password:</label>
                        <input 
                            type="password" 
                            autoComplete="current-password" 
                            value={user.password}
                            onChange={e => setUserData({ ...user, password: e.target.value })}
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn btn-primary w-full"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                
                <div className="text-center mt-15">
                    <span>New user? </span>
                    <button 
                        className="link-btn"
                        onClick={() => navigate('/register')}
                    >
                        Create account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login

