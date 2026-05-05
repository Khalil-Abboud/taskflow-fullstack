import { useEffect } from "react"
import API_BASE_URL from "./api"
function TasksPage({ onLogout }) {
    useEffect(() => {
        async function loadTasks() {
            const token = localStorage.getItem('token')
            const response = await fetch(`${API_BASE_URL}/tasks`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            const data = await response.json()
            console.log('Tasks', data)
        }
        loadTasks()
    }, [])
    return (
        <div>
            <h1>TaskFlow</h1>
            <h2>My Tasks</h2>
            <div>Tasks will be loaded here.</div>
            <button onClick={onLogout}>Logout</button>

        </div>
    )
}

export default TasksPage