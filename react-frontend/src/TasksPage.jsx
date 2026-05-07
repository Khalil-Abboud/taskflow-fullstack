import { useEffect, useState } from "react"
import TaskItem from "./TaskItem"
import API_BASE_URL from "./api"

function TasksPage({ onLogout }) {
    const [tasks, setTasks] = useState([])
    const [nextPage, setNextPage] = useState(null)
    const [previousPage, setPreviousPage] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriotiy] = useState('medium')
    const [dueDate, setDueDate] = useState('')

    async function loadTasks(url = `${API_BASE_URL}/tasks`) {
        const token = localStorage.getItem('token')
        const response = await fetch(url, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        const data = await response.json()
        setTasks(data.results)
        setNextPage(data.next)
        setPreviousPage(data.previous)
    }

    useEffect(() => {
        loadTasks()
    }, [])

    async function handleCreateTask(event) {
        event.preventDefault()
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_BASE_URL}/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
                title: title,
                description: description,
                due_date: dueDate || null,
                priority: priority
            }),
        })
        const data = await response.json()
        if (response.ok) {
            console.log('Task created', data)
            loadTasks();
            setTitle('')
            setDescription('')
            setDueDate('')
            setPriotiy('medium')
        } else {
            console.log('Create task failed:', data)
        }
    }
    return (
        <div>
            <h1>TaskFlow</h1>
            <h2>My Tasks</h2>
            <form onSubmit={handleCreateTask}>
                <h3>Create New Task</h3>

                <input type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <input type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <input type="date"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                />

                <select value={priority}
                    onChange={(event) => setPriotiy(event.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <button type='submit'>Add Task</button>
            </form>
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