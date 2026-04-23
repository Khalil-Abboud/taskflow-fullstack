const loginButton = document.getElementById("login-btn");
const logoutButton = document.getElementById("logout-btn");
const registerButton = document.getElementById("register-btn");
const registerPageButton = document.getElementById("register-page-btn");
const closeRegisterButton = document.getElementById("close-register-btn");
const output = document.getElementById("output");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const tasksForm = document.getElementById("task-form");

registerForm.style.display = "none";

function checkAuthUI() {
    const token = localStorage.getItem("token");
    if (token) {
        loginForm.style.display = "none";
        logoutButton.style.display = "block";
        tasksForm.style.display = "block";
        registerForm.style.display = "none";
    }
    else {
        loginForm.style.display = "block";
        logoutButton.style.display = "none";
        tasksForm.style.display = "none";
        registerForm.style.display = "none";
    }
}

checkAuthUI();

registerPageButton.addEventListener("click", function () {
    loginForm.style.display = "none";
    logoutButton.style.display = "none";
    registerForm.style.display = "block";
    output.textContent = "";
});
closeRegisterButton.addEventListener("click", function () {
    loginForm.style.display = "block";
    logoutButton.style.display = "none";
    registerForm.style.display = "none";
    output.textContent = "Please log in.";
});
registerButton.addEventListener("click", async function () {
    const newEmailInput = document.getElementById("new-email");
    const newUsernameInput = document.getElementById("new-username");
    const newPasswordInput = document.getElementById("new-password");
    const email = newEmailInput.value;
    const username = newUsernameInput.value;
    const password = newPasswordInput.value;
    try {
        if (!email || !username || !password) {
            output.textContent = "Please fill in all register fields.";
            return;
        }
        const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        });
        const data = await response.json();
        if (!response.ok) {
            output.textContent = "Error registering user.";
            console.log(data);
            return;
        }
        loginForm.style.display = "block";
        logoutButton.style.display = "none";
        registerForm.style.display = "none";
        output.textContent = "Registered successfully.";
    }
    catch (error) {
        output.textContent = "Error registering user.";
        console.log(error);
    }
});

logoutButton.addEventListener("click", function () {
    localStorage.removeItem("token");
    output.textContent = "Logged out.";
    checkAuthUI();
});


async function loadTasks() {
    const token = localStorage.getItem("token");
    if (!token) {
        output.textContent = "Please log in.";
        return;
    }
    output.textContent = "Loading tasks...";
    try {
        const taskResponse = await fetch("http://127.0.0.1:8000/api/tasks/", {
            headers: {
                "Authorization": "Token " + token
            }
        });
        const taskData = await taskResponse.json();
        if (!taskResponse.ok) {
            output.textContent = "Could not load tasks.";
            console.log(taskData);
            return;
        }
        const tasks = taskData.results;
        if (tasks.length === 0) {
            output.textContent = "No tasks yet.";
            return;
        }
        output.innerHTML = "";
        tasks.forEach(function (task) {
            const taskElement = document.createElement("div");
            taskElement.className = "task-card";
            const titleElement = document.createElement("div");
            titleElement.className = "task-title";
            const detailsElement = document.createElement("div");
            detailsElement.className = "task-details";
            const topRowElement = document.createElement("div");
            topRowElement.className = "task-top-row";
            const statusMap = {
                todo: "To Do",
                done: "Done"
            };
            const priorityMap = {
                low: "Low",
                medium: "Medium",
                high: "High"
            };
            const statusLabel = statusMap[task.status];
            const priorityLabel = priorityMap[task.priority];
            let dueDateText = "No due date";
            if (task.due_date) {
                dueDateText = task.due_date;
            }
            let descriptionText = "No description";
            if (task.description) {
                descriptionText = task.description;
            }
            titleElement.textContent = task.title;
            detailsElement.textContent =
                "Status: " + statusLabel +
                "| Priority: " + priorityLabel +
                "| Due date: " + dueDateText +
                "| Description: " + descriptionText;
            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.checked = task.status === "done";
            checkBox.addEventListener("change", async function () {
                const token = localStorage.getItem("token");
                const newStatus = checkBox.checked ? "done" : "todo";
                try {
                    await fetch("http://127.0.0.1:8000/api/tasks/" + task.id + "/", {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Token " + token
                        },
                        body: JSON.stringify({
                            status: newStatus
                        })
                    });
                    loadTasks();
                }
                catch (error) {
                    output.textContent = "Error updating task.";
                    console.log(error);
                }
            });
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", async function () {
                const token = localStorage.getItem("token");
                try {
                    await fetch("http://127.0.0.1:8000/api/tasks/" + task.id + "/", {
                        method: "DELETE",
                        headers: {
                            "Authorization": "Token " + token
                        }
                    });
                    loadTasks();
                }
                catch (error) {
                    output.textContent = ("Error deleting task.");
                    console.log(error);
                }
            });
            topRowElement.appendChild(checkBox);
            topRowElement.appendChild(titleElement);
            topRowElement.appendChild(deleteButton);

            taskElement.appendChild(topRowElement);
            taskElement.appendChild(detailsElement);

            output.appendChild(taskElement);
        });

    }
    catch (error) {
        output.textContent = "Could not load tasks.";
        console.log(error);
    }
}


loginButton.addEventListener("click", async function () {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const username = usernameInput.value;
    const password = passwordInput.value;

    output.textContent = "Logging in...";

    try {
        const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await response.json();

        if (!response.ok) {
            output.textContent = "Invalid username or password.";
            return;
        }
        const token = data.token;
        localStorage.setItem("token", token);
        checkAuthUI();
        loadTasks();
    }
    catch (error) {
        output.textContent = "Error during login";
        console.log(error);
    }
});

loadTasks();

const addTaskButton = document.getElementById("add-task-btn");
addTaskButton.addEventListener("click", async function () {
    const titleInput = document.getElementById("task-title");
    const title = titleInput.value;
    const priorityInput = document.getElementById("task-priority");
    const priority = priorityInput.value;
    const descriptionInput = document.getElementById("task-description");
    const description = descriptionInput.value;
    const dueDateInput = document.getElementById("task-due-date");
    const dueDate = dueDateInput.value;
    const token = localStorage.getItem("token");
    if (!token) {
        output.textContent = "Please log in first.";
        return;
    }
    if (!title) {
        output.textContent = "Please enter a task title";
        return;
    }
    try {
        const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({
                title: title,
                description: description,
                status: "todo",
                priority: priority,
                due_date: dueDate || null,
            })
        });
        const data = response.json();
        if (!response.ok) {
            output.textContent = "Error creating task.";
            console.log(data);
            return;
        }
        loadTasks();
        titleInput.value = "";
        priorityInput.value = "medium";
        dueDateInput.value = "";
    }
    catch (error) {
        output.textContent = "Error creating task.";
        console.log(error);
    }
});