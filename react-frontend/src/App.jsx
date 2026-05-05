import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import TasksPage from './TasksPage'
import './App.css'

function App() {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(localStorage.getItem('token'))
  function handleLoginSuccess(newToken) {
    setToken(newToken)
  }
  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    setToken(null)
  }
  if (token)
    return (
      <TasksPage onLogout={handleLogout} />
    )
  return (
    <div>
      <h1>TaskFlow</h1>
      <button onClick={() => setPage('login')}>Login</button>
      <button onClick={() => setPage('register')}>Register</button>
      {page === 'login' ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <RegisterForm />
      )}
    </div>
  )
}

export default App