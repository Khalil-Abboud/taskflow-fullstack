import { useEffect, useState } from "react"
import TaskItem from "./TaskItem"
import API_BASE_URL from "./api"

function TasksPage({ onLogout }) {
    const [tasks, setTasks] = useState([])
    const [nextPage, setNextPage] = useState(null)
    const [previousPage, setPreviousPage] = useState(null)
    async function loadTasks(url = `${API_BASE_URL}/tasks`) {
        const token = localStorage.getItem('token')
        const response = await fetch(url, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        const data = await response.json()
        console.log('Tasks', data)
        setTasks(data.results)
        setNextPage(data.next)
        setPreviousPage(data.previous)
    }

    useEffect(() => {
        loadTasks()
    }, [])

    return (
        <div>
            <h1>TaskFlow</h1>
            <h2>My Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks yet.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </ul>
            )}
            <div>
                <button onClick={() => loadTasks(previousPage)}
                    disabled={!previousPage}>
                    Previous
                </button>
                <button onClick={() => loadTasks(nextPage)}
                    disabled={!nextPage}>
                    Next
                </button>
            </div>
            <button onClick={onLogout}>Logout</button>

        </div>
    )
}

export default TasksPage