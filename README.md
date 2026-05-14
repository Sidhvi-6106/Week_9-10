Blog App - Full Stack MERN Project
A full-stack role-based blog application built with React, Vite, Express, MongoDB, and JWT authentication. The project is split into a frontend React app and a backend Express API, with separate setup and documentation for each side.

Project Overview
This application supports three account types:

USER: reads active articles and comments on them.
AUTHOR: creates, views, edits, and soft-deletes their own articles.
ADMIN: logs in with admin credentials and can manage account/article moderation APIs.
The app includes authentication, protected routes, author dashboards, reader profiles, profile settings, theme preferences, article comments, soft delete for articles, and backend security checks for role-based access.

Repository Structure
Week_9_10/
├── backend/
│   ├── APIs/                 # Express route modules
│   ├── config/               # Cloudinary and upload configuration
│   ├── middlewares/          # JWT and author validation middleware
│   ├── models/               # Mongoose schemas
│   ├── services/             # Shared auth/register/login logic
│   ├── req.http              # API request examples
│   ├── server.js             # Backend entry point
│   └── README.md             # Backend documentation
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/       # Page and feature components
│   │   ├── lib/              # Axios API client
│   │   ├── stores/           # Zustand auth/settings stores
│   │   ├── styles/           # Shared Tailwind class helpers
│   │   ├── App.jsx           # Application routes
│   │   └── main.jsx          # React entry point
│   └── README.md             # Frontend documentation
├── vercel.json               # Frontend deployment config
└── README.md                 # Main GitHub README
Technology Stack
Frontend
      React 19
      Vite 7
      React Router 7
      Tailwind CSS 4
      Zustand
      Axios
      React Hook Form
      React Hot Toast
      ESLint
Backend
      Node.js
      Express 5
      MongoDB with Mongoose
      JWT authentication
      bcrypt password hashing
      cookie-parser
      CORS
      dotenv
      multer
      Cloudinary
Features
- User and author registration.
- Role-based login for USER, AUTHOR, and ADMIN.
- JWT authentication using httpOnly cookies with Authorization header fallback.
- Password hashing with bcrypt.
- Session restore through /common-api/check-auth.
- Reader dashboard with all active articles.
- Author dashboard with only the logged-in author's articles.
- Create, edit, read, and soft-delete articles.
- Article comments by users.
- Profile settings update for name, email, phone, website, occupation, image URL, bio, location, and theme.
- Light, warm, and dark themes stored in local storage.
- Admin login endpoint.
- Admin API for blocking/unblocking accounts.
- CORS configuration for local development, Vercel previews, and custom frontend URLs.
- Cloudinary upload helper configuration for future image upload support.
- How To Run The Project Locally
- Open two terminals: one for the backend and one for the frontend.

1. Start the Backend
    cd backend
    npm install
    Create a .env file inside backend/:

    PORT=10000
    DB_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    FRONTEND_URL=http://localhost:5173

# Optional, needed only if Cloudinary upload routes are added/enabled
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
Run the API:

npm start
The backend runs on:

http://localhost:10000
If you prefer port 4000, set PORT=4000 in backend/.env.

2. Start the Frontend
    cd frontend
    npm install
    Create a .env file inside frontend/:

VITE_API_BASE_URL=http://localhost:10000
Run the React app:

npm run dev
The frontend runs on:

http://localhost:5173
Useful Commands
Backend
cd backend
npm install
npm start
Frontend
cd frontend
npm install
npm run dev
npm run build
npm run lint
npm run preview
Main API Groups
API Group	Purpose
/user-api	User registration, reading articles, comments
/author-api	Author registration and article management
/admin-api	Admin login and moderation APIs
/common-api	Shared login, logout, auth check, password/profile APIs
Deployment Notes
The root vercel.json is configured to build the frontend:

{
  "installCommand": "cd frontend && npm install",
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist"
}
The frontend uses VITE_API_BASE_URL when available. If it is not provided, it falls back to the deployed Render backend URL currently configured in frontend/src/lib/api.js.

For deployment, configure these environment variables in the hosting dashboards:

Frontend: VITE_API_BASE_URL
Backend: PORT, DB_URL, JWT_SECRET, FRONTEND_URL
Optional Cloudinary variables: CLOUD_NAME, API_KEY, API_SECRET
Recommended First Test Flow
Start the backend.
Start the frontend.
Register a new author.
Log in as the author.
Create an article.
Register a new user.
Log in as the user.
Read the article and add a comment.
Log back in as the author.
Edit or delete the article.
