# TaskFlow Fullstack App

TaskFlow is a fullstack task management application built with:

- Django REST Framework (Backend API)
- Vanilla JavaScript (Frontend)
- PostgreSQL
- Docker

This project started as a backend-only API and was extended into a working fullstack application with a simple frontend that communicates with the API using token-based authentication.

---

## Current Features

### Authentication
- User registration
- User login
- Token-based authentication using DRF TokenAuthentication

### Tasks (Backend API)
- Create a task
- List user tasks
- Retrieve task details
- Update a task
- Delete a task

### Task Ownership
- Each task belongs to one user
- Users can only access their own tasks

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

### Pagination
- Page number pagination enabled
- Default page size: `5`

---

## Frontend Features (Current State)

- Basic login form (username + password)
- Sends login request to Django API
- Receives and stores authentication token in `localStorage`
- Automatically loads tasks if a token exists
- Fetches tasks using the saved token
- Displays API response inside the page

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
├── frontend/
│ ├── index.html
│ ├── script.js
│ └── style.css (optional)
└── README.md


---

## API Endpoints

### Authentication

#### Register

`POST /api/users/register/`

Example:


{
"username": "testuser",
"email": "user@example.com
",
"password": "yourpassword123"
}


---

#### Login

`POST /api/users/login/`

Example:


{
"username": "testuser",
"password": "yourpassword123"
}


Response:


{
"token": "your_token_here",
"username": "testuser",
"email": "user@example.com
"
}


---

### Tasks

#### List Tasks

`GET /api/tasks/`

#### Create Task

`POST /api/tasks/`

#### Retrieve Task

`GET /api/tasks/<id>/`

#### Update Task

`PUT /api/tasks/<id>/`  
`PATCH /api/tasks/<id>/`

#### Delete Task

`DELETE /api/tasks/<id>/`

---

## Authentication Header


Authorization: Token your_token_here


---

## Running the Project

### 1. Backend (Docker)


cd backend
docker compose up --build


### 2. Apply Migrations


docker compose exec web python manage.py migrate


### 3. Create Superuser (optional)


docker compose exec web python manage.py createsuperuser


### 4. Frontend


cd frontend
py -m http.server 5500


Open:


http://127.0.0.1:5500


---

## How It Works (Current Flow)

1. User enters username and password
2. Frontend sends login request to API
3. API returns authentication token
4. Token is stored in `localStorage`
5. Frontend automatically uses token for future requests
6. Tasks are fetched and displayed

---

## Notes

- Backend requires authentication for all task endpoints
- Token is stored in the browser (localStorage)
- Frontend is intentionally simple for learning purposes
- Uses Fetch API instead of frameworks (React, etc.)

---

## Future Improvements

- Improve UI/UX (replace raw JSON with styled components)
- Add task creation from frontend
- Add edit/delete task functionality
- Add logout functionality
- Improve error handling and user feedback
- Refactor frontend structure
- Migrate frontend to React
- Add API documentation (Swagger)
- Switch to JWT authentication
- Prepare production deployment

---

## Status

- Backend API: ✔ Complete (MVP)
- Frontend: ✔ Basic integration working
- Authentication flow: ✔ Working
- Fullstack connection: ✔ Working
- UI: ❌ Minimal (to be improved)