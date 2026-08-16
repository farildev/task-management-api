# Task Management API

A RESTful API for task management built with Node.js, Express, TypeScript, and PostgreSQL. Features JWT authentication, role-based access control, and a clean MVC architecture.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| Database | PostgreSQL |
| Authentication | JWT (jsonwebtoken) |
| Password Hashing | bcryptjs |
| Validation | Zod |
| Security | Helmet, CORS |
| Dev Server | ts-node-dev |

---

## Project Structure

```
task-management-api/
├── src/
│   ├── app.ts                        # Express app setup
│   ├── server.ts                     # HTTP server entry point
│   ├── config/
│   │   ├── database.ts               # PostgreSQL connection pool
│   │   └── env.ts                    # Environment variable validation
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── project.controller.ts
│   │   ├── task.controller.ts
│   │   └── comment.controller.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── project.model.ts
│   │   ├── task.model.ts
│   │   └── comment.model.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── project.service.ts
│   │   ├── task.service.ts
│   │   └── comment.service.ts
│   ├── routes/
│   │   ├── index.ts                  # Route aggregator
│   │   ├── auth.ts
│   │   ├── projects.ts
│   │   ├── tasks.ts
│   │   └── comments.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts        # JWT verification
│   │   └── error.middleware.ts       # Global error handler
│   └── types/
│       ├── index.ts                  # Entity interfaces
│       └── express.d.ts              # Express Request augmentation
├── database/
│   └── migrations/
│       ├── 001_create_users.sql
│       ├── 002_create_projects.sql
│       ├── 003_create_tasks.sql
│       └── 004_create_comments.sql
├── .env.example
├── .gitignore
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL 17+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/task-management-api.git
cd task-management-api

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task-management
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

### Database Setup

Run the migration files in order using pgAdmin or psql:

```bash
psql -U your_db_user -d task-management -f database/migrations/001_create_users.sql
psql -U your_db_user -d task-management -f database/migrations/002_create_projects.sql
psql -U your_db_user -d task-management -f database/migrations/003_create_tasks.sql
psql -U your_db_user -d task-management -f database/migrations/004_create_comments.sql
```

### Run the Server

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

Server runs on `http://localhost:3000`

---

## API Reference

### Base URL

```
http://localhost:3000/api
```

### Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

### Auth Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and get token | ❌ |
| `POST` | `/auth/logout` | Logout | ✅ |

#### POST `/auth/register`

```json
// Request Body
{
  "name": "Faril Mammadov",
  "email": "faril@gmail.com",
  "password": "123456"
}

// Response 201
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "Faril Mammadov",
      "email": "faril@gmail.com",
      "role": "member",
      "created_at": "2026-08-12T20:36:35.904Z",
      "updated_at": "2026-08-12T20:36:35.904Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST `/auth/login`

```json
// Request Body
{
  "email": "faril@gmail.com",
  "password": "123456"
}

// Response 200
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Project Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/projects` | Get all projects | ✅ |
| `GET` | `/projects/:id` | Get project by ID | ✅ |
| `POST` | `/projects` | Create a new project | ✅ |
| `PATCH` | `/projects/:id` | Update a project | ✅ |
| `DELETE` | `/projects/:id` | Delete a project | ✅ |

#### POST `/projects`

```json
// Request Body
{
  "name": "My First Project",
  "description": "This is a project description"
}

// Response 201
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "My First Project",
    "description": "This is a project description",
    "owner_id": "uuid",
    "created_at": "2026-08-12T20:36:35.904Z",
    "updated_at": "2026-08-12T20:36:35.904Z"
  }
}
```

#### PATCH `/projects/:id`

```json
// Request Body
{
  "name": "Updated Project Name",
  "description": "Updated description"
}
```

---

### Task Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/projects/:projectId/tasks` | Get all tasks in a project | ✅ |
| `GET` | `/projects/:projectId/tasks/:id` | Get task by ID | ✅ |
| `POST` | `/projects/:projectId/tasks` | Create a new task | ✅ |
| `PATCH` | `/projects/:projectId/tasks/:id` | Update a task | ✅ |
| `DELETE` | `/projects/:projectId/tasks/:id` | Delete a task | ✅ |

#### POST `/projects/:projectId/tasks`

```json
// Request Body
{
  "title": "Design the homepage",
  "description": "Create wireframes and mockups",
  "priority": "high",
  "assignedTo": "user-uuid",
  "dueDate": "2026-09-01"
}

// Response 201
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Design the homepage",
    "description": "Create wireframes and mockups",
    "status": "todo",
    "priority": "high",
    "project_id": "uuid",
    "created_by": "uuid",
    "assigned_to": "uuid",
    "due_date": "2026-09-01",
    "created_at": "2026-08-12T20:36:35.904Z",
    "updated_at": "2026-08-12T20:36:35.904Z"
  }
}
```

#### PATCH `/projects/:projectId/tasks/:id`

```json
// Request Body — any of the following fields
{
  "title": "Updated title",
  "status": "in_progress",
  "priority": "medium",
  "assignedTo": "user-uuid",
  "dueDate": "2026-09-15"
}
```

**Task status values:** `todo` | `in_progress` | `done`

**Task priority values:** `low` | `medium` | `high`

---

### Comment Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/tasks/:taskId/comments` | Get all comments on a task | ✅ |
| `POST` | `/tasks/:taskId/comments` | Add a comment to a task | ✅ |
| `DELETE` | `/tasks/:taskId/comments/:id` | Delete a comment | ✅ |

#### POST `/tasks/:taskId/comments`

```json
// Request Body
{
  "content": "This task looks great!"
}

// Response 201
{
  "success": true,
  "data": {
    "id": "uuid",
    "content": "This task looks great!",
    "task_id": "uuid",
    "user_id": "uuid",
    "created_at": "2026-08-12T20:36:35.904Z",
    "updated_at": "2026-08-12T20:36:35.904Z"
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

| Status Code | Meaning |
|---|---|
| `400` | Bad Request — invalid input |
| `401` | Unauthorized — missing or invalid token |
| `403` | Forbidden — not allowed to perform this action |
| `404` | Not Found — resource does not exist |
| `409` | Conflict — resource already exists (e.g. email) |
| `500` | Internal Server Error |

---

## Database Schema

```sql
users
  id          UUID PRIMARY KEY
  name        VARCHAR(100)
  email       VARCHAR(255) UNIQUE
  password    VARCHAR(255)
  role        VARCHAR(20) DEFAULT 'member'
  created_at  TIMESTAMP
  updated_at  TIMESTAMP

projects
  id          UUID PRIMARY KEY
  name        VARCHAR(255)
  description TEXT
  owner_id    UUID → users.id
  created_at  TIMESTAMP
  updated_at  TIMESTAMP

tasks
  id          UUID PRIMARY KEY
  title       VARCHAR(255)
  description TEXT
  status      VARCHAR(20) DEFAULT 'todo'
  priority    VARCHAR(20) DEFAULT 'medium'
  project_id  UUID → projects.id
  assigned_to UUID → users.id
  created_by  UUID → users.id
  due_date    DATE
  created_at  TIMESTAMP
  updated_at  TIMESTAMP

comments
  id          UUID PRIMARY KEY
  content     TEXT
  task_id     UUID → tasks.id
  user_id     UUID → users.id
  created_at  TIMESTAMP
  updated_at  TIMESTAMP
```

---

## Request Flow

```
Request
  → Routes
  → Auth Middleware (JWT verify)
  → Controller (handle req/res)
  → Service (business logic)
  → Model (SQL queries)
  → PostgreSQL
```

---

## Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Start production server
```

---

## License

MIT
