# Book Library Management System

A full-stack MERN application for managing a book collection with authentication, search, and CRUD operations.

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
