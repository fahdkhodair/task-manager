# Task Manager – Full Stack Web Application

A full-stack Task Management Application built with **React.js, Node.js, Express.js, and PostgreSQL**. The application allows users to securely manage their tasks through a responsive user interface and a RESTful API.

The project demonstrates full-stack development concepts, including authentication, database management, API integration, protected routes, and CRUD operations.

## 🚀 Features

### 🔐 Authentication & Authorization
- User Registration.
- User Login.
- JWT-based authentication.
- Password hashing.
- Protected frontend routes.
- Persistent authentication state.

### 📋 Task Management
- Create new tasks.
- Retrieve and display tasks.
- Update existing tasks.
- Delete tasks.
- Manage tasks through REST API endpoints.

### 🎨 Frontend
- Responsive user interface.
- React component-based architecture.
- Client-side routing with React Router.
- Authentication Context for global state management.
- Axios for API communication.
- Protected pages for authenticated users.

### ⚙️ Backend
- RESTful API architecture.
- Express.js middleware.
- MVC-inspired project organization.
- Sequelize ORM for database operations.
- PostgreSQL relational database.
- Centralized environment configuration.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| ORM | Sequelize |
| Authentication | JSON Web Token (JWT) |
| Security | bcrypt / Password Hashing |
| Version Control | Git & GitHub |

## 📁 Project Structure

```text
task-manager/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── Models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.js
│   │
│   └── package.json
│
├── frontend/
│   └── task-manager/
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   ├── context/
│       │   ├── hooks/
│       │   ├── layouts/
│       │   ├── pages/
│       │   ├── routes/
│       │   └── services/
│       │
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/fahdkhodair/task-manager.git

cd task-manager
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=3000

DB_NAME=task-manager
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres

JWT_SECRET=your_jwt_secret
```

**Important:** Replace the database credentials and JWT secret with your own values.

Make sure your PostgreSQL server is running and the database exists.

Start the backend development server:

```bash
npm run dev
```

The backend API will run at:

```text
http://localhost:3000
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend/task-manager
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:5173
```

## 🔗 API Architecture

The backend provides RESTful API endpoints for authentication and task management.

### Authentication API

Base URL:

```text
/api/auth
```

Responsible for:
- User registration.
- User login.
- Authentication verification.

### Tasks API

Base URL:

```text
/api/tasks
```

Responsible for:
- Creating tasks.
- Retrieving tasks.
- Updating tasks.
- Deleting tasks.

## 🗄️ Database

The application uses PostgreSQL as its relational database.

Sequelize ORM is used to:
- Define database models.
- Manage database relationships.
- Perform database queries.
- Handle database operations.

## 🔒 Security

Security practices implemented in the application include:

- JWT-based authentication.
- Password hashing.
- Protected frontend routes.
- Backend authentication middleware.
- Environment variables for sensitive configuration.

## 🧪 Testing

API endpoints can be tested using [Postman](https://www.postman.com/).

Test authentication and task management operations by sending HTTP requests to the backend API.

## 👨‍💻 Developer

**Fahd Khodair**

Backend / Full Stack Web Developer

**Technical Focus:**
- Backend: Node.js, Express.js, JavaScript, TypeScript.
- Frontend: React.js.
- Databases: PostgreSQL, MongoDB.

### Connect With Me

- GitHub: [@fahdkhodair](https://github.com/fahdkhodair)

---

⭐ If you find this project useful, consider giving it a star!
