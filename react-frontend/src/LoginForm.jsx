import { useState } from 'react'
import API_BASE_URL from './api'

function LoginForm({ onLoginSuccess }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    async function handleLogin(event) {
        event.preventDefault()
        const response = await fetch(`${API_BASE_URL}/users/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        const data = await response.json()
        if (response.ok) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('email', data.email)
            onLoginSuccess(data.token)
            console.log('Login successful', data)
        }
        else {
            console.log('Login failed', data)
            setMessage('Login failed. Please check your data.')
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <input type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm