function TaskItem({ task }) {
    return (
        <li>
            <h3>{task.title}</h3>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Due date: {task.due_date}</p>
        </li>
    )
}

export default TaskItem