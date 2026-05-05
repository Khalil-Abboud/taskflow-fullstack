import { useState } from 'react'
import API_BASE_URL from './api'

function RegisterForm() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    async function handleRegister(event) {
        event.preventDefault()
        const response = await fetch(`${API_BASE_URL}/users/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        })
        const data = await response.json()
        if (response.ok) {
            console.log('Register successful', data)
            setMessage('Registration successful. You can login now.')
        }
        else {
            console.log('Register Failed', data)
            setMessage('Registration failed. Please check your data.')
        }
    }
    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterForm