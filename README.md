Book Library Management System

A full-stack MERN application for managing book collections in libraries, schools, or personal use.

What it solves:
- Replaces manual book tracking (spreadsheets/paper) with a digital system
- Organizes books by title, author, category, and publication date
- Tracks availability status (Available/Issued) in real time
- Enables quick search across large collections
- Allows bookmarking favorite books for priority access
- Supports reading web-based documents directly in the built-in reader

Tech Stack:
- Frontend: React 18, Vite, Tailwind CSS, React Router, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Auth: JWT tokens, bcryptjs password hashing
- Database: MongoDB Atlas (or in-memory fallback for local dev)

Features:
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

How to run on any device:

1. Install Node.js from https://nodejs.org

2. Clone the repository:
   git clone <your-repo-url>
   cd Book-Library-Management-syarem

3. Start the backend:
   cd server
   npm install
   npm run dev

4. Start the frontend (new terminal):
   cd client
   npm install
   npm run dev

5. Open http://localhost:5173 in your browser

Environment variables (server/.env):
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri_here
JWT_SECRET=your_secret_key_here
CLIENT_ORIGIN=http://localhost:5173

Note: If MONGODB_URI is not configured, the app automatically uses an in-memory MongoDB for local development.
