# Book Library Management System

A full-stack MERN application for managing book collections in libraries, schools, or personal use.

## What it solves

- Replaces manual book tracking (spreadsheets/paper) with a digital system
- Organizes books by title, author, category, and publication date
- Tracks availability status (Available/Issued) in real time
- Enables quick search across large collections
- Allows bookmarking favorite books for priority access
- Supports reading web-based documents directly in the built-in reader

## Tech Stack

- Frontend: React 18, Vite, Tailwind CSS, React Router, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Auth: JWT tokens, bcryptjs password hashing
- Database: MongoDB Atlas (or in-memory fallback for local dev)

## Features

- User signup/login with JWT authentication
- Add, edit, delete, and search books
- Toggle book status (Available/Issued)
- Favorite/unfavorite books with filter
- Book reader with page-flip and scroll modes
- Embed and read web documents via URL
- Publication year and date tracking
- Responsive design for all screen sizes
- Toast notifications for all actions
- Protected routes for authenticated users

## Project Structure

```
book-library/
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Navbar, SearchBar, BookForm, BookList, BookCard, Toast, Spinner, ProtectedRoute
│   │   ├── context/      # AuthContext (global auth state)
│   │   ├── pages/        # Login, SignUp, BookDashboard
│   │   └── services/     # Axios API instance with interceptors
│   └── .env              # VITE_API_BASE_URL
└── server/          # Node.js + Express backend
    ├── config/           # MongoDB connection
    ├── controllers/      # Auth & Book controllers
    ├── middleware/       # JWT auth, error handling
    ├── models/           # User & Book Mongoose schemas
    ├── routes/           # Auth & Book routes
    ├── utils/            # asyncHandler, generateToken
    └── .env              # PORT, MONGODB_URI, JWT_SECRET, CLIENT_ORIGIN
```

## Setup

### Backend

```bash
cd server
npm install
```

Edit `.env` and set your MongoDB Atlas connection string and JWT secret.

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## API Endpoints

| Method | Endpoint                  | Auth | Description              |
|--------|---------------------------|------|--------------------------|
| POST   | /api/auth/signup          | No   | Register new user        |
| POST   | /api/auth/login           | No   | Login user               |
| GET    | /api/books                | No   | List books (?search=)    |
| POST   | /api/books                | Yes  | Create book              |
| PUT    | /api/books/:id            | Yes  | Update book              |
| PATCH  | /api/books/:id/status     | Yes  | Toggle book status       |
| DELETE | /api/books/:id            | Yes  | Delete book              |

## Environment Variables (server/.env)

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri_here
JWT_SECRET=your_secret_key_here
CLIENT_ORIGIN=http://localhost:5173
```

Note: If MONGODB_URI is not configured, the app automatically uses an in-memory MongoDB for local development.
