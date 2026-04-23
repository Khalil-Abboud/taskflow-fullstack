# TaskFlow Fullstack App

TaskFlow is a fullstack task management application built with:

- Django REST Framework (Backend API)
- Vanilla JavaScript (Frontend)
- PostgreSQL
- Docker

This project started as a backend-only API and was extended into a working fullstack application with a dynamic frontend that communicates with the API using token-based authentication.

---

## Current Features

### Authentication
- User registration (from frontend and API)
- User login
- Token-based authentication using DRF TokenAuthentication
- Logout (client-side with token removal)

---

### Tasks (Backend API)
- Create a task
- List user tasks
- Retrieve task details
- Update a task (status, fields)
- Delete a task

---

### Task Ownership
- Each task belongs to one user
- Users can only access their own tasks

---

### Filtering, Search, and Ordering
- Filter tasks by:
  - `status`
  - `priority`
  - `due_date`
- Search tasks by:
  - `title`
  - `description`
- Order tasks by:
  - `created_at`
  - `title`
  - `due_date`

---

### Pagination
- Page number pagination enabled
- Default page size: `5`

---

## Frontend Features (Updated)

### Authentication UI
- Login form
- Register form (separate UI view)
- Switch between Login / Register
- Logout button
- Conditional UI rendering based on authentication state

---

### Token Handling
- Token stored in `localStorage`
- Auto-login if token exists
- Token used automatically in API requests

---

### Task Management (Frontend)
- Add new task from UI
- Delete task
- Toggle task status using checkbox
- Load tasks dynamically without page reload
- Display only current user's tasks

---

### Extended Task Fields (Frontend + Backend)
Each task now supports:

- Title
- Description (textarea input)
- Status (To Do / Done toggle)
- Priority (Low / Medium / High via select)
- Due date (date input)

---

### Task Display Improvements
- Each task rendered as structured block (not raw text)
- Separation between:
  - Title
  - Details (status, priority, due date, description)
- Interactive elements:
  - Checkbox for status
  - Delete button
- Dynamic rendering using JavaScript (DOM manipulation)

---

## Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- PostgreSQL
- Docker
- Docker Compose

### Frontend
- HTML
- Vanilla JavaScript
- Fetch API
- LocalStorage
- DOM manipulation

---

## Project Structure


taskflow-fullstack/
├── backend/
│ ├── config/
│ ├── tasks/
│ ├── users/
│ ├── Dockerfile
│ ├── docker-compose.yml
│ ├── requirements.txt
│ └── manage.py
│
├── frontend/
│ ├── index.html
│ ├── script.js
│ └── style.css (in progress)
│
└── README.md


---

## API Endpoints

### Authentication

#### Register

`POST /api/users/register/`

Example:

```json
{
  "username": "testuser",
  "email": "user@example.com",
  "password": "yourpassword123"
}
Login

POST /api/users/login/

Example:

{
  "username": "testuser",
  "password": "yourpassword123"
}

Response:

{
  "token": "your_token_here",
  "username": "testuser",
  "email": "user@example.com"
}
Tasks
List Tasks

GET /api/tasks/

Create Task

POST /api/tasks/

Example:

{
  "title": "Finish project",
  "description": "Write documentation",
  "status": "todo",
  "priority": "high",
  "due_date": "2026-04-25"
}
Retrieve Task

GET /api/tasks/<id>/

Update Task

PUT /api/tasks/<id>/
PATCH /api/tasks/<id>/

Delete Task

DELETE /api/tasks/<id>/

Authentication Header
Authorization: Token your_token_here
Running the Project
1. Backend (Docker)
cd backend
docker compose up --build
2. Apply Migrations
docker compose exec web python manage.py migrate
3. Create Superuser (optional)
docker compose exec web python manage.py createsuperuser
4. Frontend
cd frontend
py -m http.server 5500

Open:

http://127.0.0.1:5500
How It Works (Current Flow)
User registers or logs in from frontend
Frontend sends request to Django API
API returns authentication token
Token is stored in localStorage
UI updates based on authentication state
Frontend automatically loads tasks
All requests include the token in headers
User can:
Add tasks
Toggle status
Delete tasks
Notes
Backend requires authentication for all task endpoints
Token is stored in the browser (localStorage)
Frontend is built without frameworks for learning purposes
Uses Fetch API instead of libraries (Axios, etc.)
UI is currently functional but not styled (CSS improvements next)
Future Improvements
Improve UI/UX (CSS layout, task cards, spacing)
Add task editing (title, description, priority, due date)
Improve error handling and validation messages
Add loading indicators and better feedback
Refactor frontend code into reusable functions
Introduce component-based structure
Migrate frontend to React
Add API documentation (Swagger / Redoc)
Switch authentication to JWT
Prepare production deployment
Status
Backend API: ✔ Complete (MVP)
Authentication: ✔ Working (Register + Login + Token)
Task System: ✔ Fully functional
Frontend Logic: ✔ Dynamic and interactive
Fullstack Integration: ✔ Working
UI/UX: ⚠ Needs styling (next step)