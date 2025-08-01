# Wellness Session Platform

A full-stack application that allows users to securely authenticate, view wellness sessions, draft and publish their own custom sessions with auto-save functionality.

## Features

- **Secure Authentication**
  - User registration and login with JWT
  - Password hashing with bcrypt
  - Protected routes with JWT middleware

- **Session Management**
  - Browse published wellness sessions
  - Create, view, edit, and delete your own sessions
  - Save sessions as drafts or publish them

- **Auto-Save Functionality**
  - Drafts automatically save after 5 seconds of inactivity
  - Visual feedback when auto-save occurs

- **Responsive Design**
  - Works on desktop and mobile devices

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React.js with React Router DOM
- Context API for state management
- Axios for API requests
- react-hot-toast for notifications

## Folder Structure

```
wellness-session-platform/
├── backend/             # Node.js + Express backend
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── .env.example     # Environment variables example
│   ├── package.json     # Backend dependencies
│   └── server.js        # Entry point
├── frontend/            # React.js frontend
│   ├── public/          # Public assets
│   ├── src/             # Source code
│   │   ├── assets/      # Images and styles
│   │   ├── components/  # Reusable components
│   │   ├── contexts/    # Context providers
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── utils/       # Utility functions
│   ├── .env.example     # Environment variables example
│   └── package.json     # Frontend dependencies
└── README.md            # Project documentation
```

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string and JWT secret:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/wellness-app
JWT_SECRET=your-secure-jwt-secret-key
JWT_EXPIRATION=7d
FRONTEND_URL=http://localhost:3000
```

5. Start the server:
```bash
npm run dev
```

The backend server will run on http://localhost:5000.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your backend URL:
```
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm start
```

The frontend will run on http://localhost:3000.

## API Documentation

### Authentication Routes

| Method | Endpoint     | Description       | Request Body                      |
|--------|--------------|-------------------|-----------------------------------|
| POST   | /api/auth/register | Register new user | `{ email, password }`            |
| POST   | /api/auth/login    | Login user        | `{ email, password }`            |

### Session Routes

| Method | Endpoint                         | Description                | Request Body / Parameters        |
|--------|----------------------------------|----------------------------|----------------------------------|
| GET    | /api/sessions                    | Get all published sessions | -                                |
| GET    | /api/sessions/my-sessions        | Get user's sessions        | Requires authentication          |
| GET    | /api/sessions/my-sessions/:id    | Get single user session    | Requires authentication          |
| POST   | /api/sessions/my-sessions/save-draft | Save/update draft      | `{ sessionId?, title, tags, json_file_url }` |
| POST   | /api/sessions/my-sessions/publish    | Publish session        | `{ sessionId?, title, tags, json_file_url }` |
| DELETE | /api/sessions/my-sessions/:id    | Delete session             | Requires authentication          |

## Security Measures

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Server-side middleware and client-side route protection
- **CORS Configuration**: Restricted to the frontend origin
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Custom error handling middleware
- **No Sensitive Data Exposure**: Passwords and tokens are properly handled

## Deployment

### Backend Deployment (Railway/Render)

1. Create a new project on Railway/Render
2. Connect your GitHub repository
3. Set environment variables from your `.env` file
4. Deploy the backend

### Frontend Deployment (Netlify/Vercel)

1. Create a new project on Netlify/Vercel
2. Connect your GitHub repository
3. Set build command to `cd frontend && npm run build`
4. Set environment variables for the frontend
5. Deploy the frontend

## Bonus Features Implemented

- **Auto-save Feedback**: Toast notifications when auto-save occurs
- **Fully Working Logout**: Complete logout functionality that clears tokens
- **Responsive UI**: Mobile-friendly interface with adaptive layouts
- **Search & Filtering**: Search sessions by title and filter by tags
- **Form Validation**: Client-side validation for all forms
- **Toast Notifications**: User-friendly feedback for all actions
- **Optimistic UI Updates**: UI updates before server confirmation for better UX

## Author

- [Vedant224](https://github.com/Vedant224)

