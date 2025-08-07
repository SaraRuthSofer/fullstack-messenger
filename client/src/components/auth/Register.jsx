import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../redux/actions/userAction'
import authService from '../../services/authService'

function Register({ onClose, onSwitchToLogin }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUserData] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        try {
            const res = await authService.register(user)
            if (res) {
                dispatch(setUser(res.data))
                navigate('/')
                if (onClose) onClose()
            }
        }
        catch (error) {
            console.log(error);
            setError("Registration error, please try again")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                {onClose && (
                    <button 
                        onClick={onClose} 
                        className="close-btn"
                    >
                        ×
                    </button>
                )}
                
                <h2>Register</h2>
                <p>Create a new account</p>

                {error && <div className="text-error">{error}</div>}

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input 
                            type="text" 
                            autoComplete="name" 
                            value={user.name}
                            onChange={e => setUserData({ ...user, name: e.target.value })}
                            required
                        />
                    </div>
                    
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
                            autoComplete="new-password" 
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
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                
                <div className="text-center mt-15">
                    <span>Already have an account? </span>
                    <button 
                        className="link-btn"
                        onClick={()=>navigate('/login')}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register
