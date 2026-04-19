const loginButton = document.getElementById("login-btn");
const output = document.getElementById("output");
console.log("start");

async function laodTask() {
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
        output.textContent = JSON.stringify(taskData, null, 2);
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
        const token = data.token;
        localStorage.setItem("token", token);
        console.log("Saved token:", token);
        laodTask();
    }
    catch {
        output.textContent = "Error during login";
        console.log("error");
    }
});

laodTask();
