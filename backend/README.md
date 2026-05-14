# Blog App Backend

Express and MongoDB backend for the Blog App. It handles registration, login, JWT authentication, role-based access, articles, comments, profile settings, admin moderation APIs, and database persistence.

## Backend Stack

- Node.js
- Express 5
- MongoDB
- Mongoose
- JSON Web Tokens
- bcrypt
- cookie-parser
- CORS
- dotenv
- multer
- Cloudinary

## Backend Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cloudinary": "^2.9.0",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.6",
  "dotenv": "^17.2.3",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.1.5",
  "multer": "^2.1.1"
}
```

## Folder Structure

```text
backend/
├── APIs/
│   ├── AdminAPI.js            # Admin login and moderation APIs
│   ├── AuthorAPI.js           # Author registration and article APIs
│   ├── CommonAPI.js           # Shared login/logout/profile/auth APIs
│   └── UserAPI.js             # User registration, reading, comments
├── config/
│   ├── cloudinary.js          # Cloudinary credentials setup
│   ├── cloudinaryUpload.js    # Cloudinary upload helpers
│   └── multer.js              # Memory upload and image validation
├── middlewares/
│   ├── checkAuthor.js         # Validates author accounts
│   └── verfiyToken.js         # JWT verification and role checks
├── models/
│   ├── ArticleModel.js        # Article and comment schema
│   └── UserModel.js           # User/author/admin schema
├── services/
│   └── authService.js         # Register and authenticate services
├── package.json
├── req.http                   # Manual API testing requests
├── server.js                  # Express entry point
└── README.md
```

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=10000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173

# Optional, needed only if image upload routes are enabled
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

## How To Start The Backend

Install dependencies:

```bash
cd backend
npm install
```

Start the server:

```bash
npm start
```

The server uses:

```text
http://localhost:10000
```

If you want to use `http://localhost:4000`, set this in `.env`:

```env
PORT=4000
```

## Available Scripts

```bash
npm start
```

Runs `node server.js`.

```bash
npm test
```

Currently contains the default placeholder test script.

## Database Models

### User Model

Collection name: `user`

Fields:

- `firstName`
- `lastName`
- `email`
- `password`
- `profileImageUrl`
- `phoneNumber`
- `website`
- `occupation`
- `displayName`
- `bio`
- `location`
- `theme`
- `role`: `USER`, `AUTHOR`, or `ADMIN`
- `isActive`
- timestamps

### Article Model

Collection name: `article`

Fields:

- `author`
- `title`
- `category`
- `content`
- `comments`
- `isArticleActive`
- timestamps

Comments store:

- `user`
- `comment`

## Authentication Flow

1. User or author registers.
2. Password is hashed with bcrypt.
3. Login validates email, password, role, and active status.
4. JWT is signed using `JWT_SECRET`.
5. Token is returned in the response and also saved as an httpOnly cookie.
6. Protected routes use `verifyToken(...)`.
7. The frontend also sends the token in the `Authorization` header as a fallback for cross-domain deployments.

## API Routes

### User API

Base path:

```text
/user-api
```

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/users` | Public | Register a user |
| `GET` | `/articles` | USER | Read all active articles |
| `GET` | `/article/:id` | USER, AUTHOR | Read one active article |
| `PUT` | `/articles` | USER | Add a comment to an article |

### Author API

Base path:

```text
/author-api
```

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/users` | Public | Register an author |
| `POST` | `/articles` | AUTHOR | Create an article |
| `GET` | `/articles/:authorId` | AUTHOR | Read logged-in author's articles |
| `PUT` | `/articles` | AUTHOR | Edit an author's own article |
| `PATCH` | `/articles/:id/status` | AUTHOR | Soft-delete or restore an author's own article |

### Common API

Base path:

```text
/common-api
```

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/login` | Public | Login user, author, or admin |
| `GET` | `/logout` | Public | Clear auth cookie |
| `PUT` | `/change-password` | Public payload-based check | Change password after verifying current password |
| `GET` | `/check-auth` | USER, AUTHOR, ADMIN | Restore logged-in session |
| `PUT` | `/profile` | USER, AUTHOR, ADMIN | Update profile/settings fields |

### Admin API

Base path:

```text
/admin-api
```

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/adminlogin` | Public | Login as admin |
| `GET` | `/readarticles/:authorId` | Valid author check | Read active articles by author |
| `PUT` | `/hold` | Admin feature endpoint | Block or unblock a user account |

## Security Features

- Password hashing using bcrypt.
- JWT-based authentication.
- Role-based route protection.
- Account active/inactive checks.
- Author ownership checks before viewing, editing, or deleting author articles.
- CORS allowlist for local frontend, Vercel deployments, and `FRONTEND_URL`.
- Cookie auth with `httpOnly`, `secure`, and `sameSite: none`.
- Authorization header fallback for deployed frontend/backend on different domains.

## Extra Features Added

- Shared reusable `authService` for registration and login across users, authors, and admins.
- Duplicate email protection during registration.
- Legacy plain-text password migration path during login.
- Protected profile update route.
- Profile fields such as phone, website, occupation, display name, bio, location, image URL, and theme.
- Session validation route for frontend refresh persistence.
- Soft-delete article status instead of permanent deletion.
- Populated author and comment user details in article responses.
- Multer memory upload setup with image type and size validation.
- Cloudinary upload helper setup for profile images.

## Manual API Testing

The `req.http` file contains sample requests for:

- Registering users
- Registering authors
- Logging in
- Creating articles
- Reading author articles
- Updating articles
- Soft-deleting/restoring articles
- Reading all user articles
- Adding comments
- Admin login
- Admin moderation

Update the host in `req.http` if your backend runs on a different port.

## Deployment Checklist

Set these backend environment variables in the deployment platform:

```env
PORT=10000
DB_URL=your_production_mongodb_connection_string
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=https://your-frontend-domain
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Also make sure the frontend deployment URL is allowed by CORS. The current server already allows:

- `http://localhost:5173`
- configured `FRONTEND_URL`
- Vercel preview domains matching `https://*.vercel.app`

## Recommended Startup Order

1. Start MongoDB or confirm the MongoDB Atlas connection string works.
2. Start the backend with `npm start`.
3. Confirm the server logs `DataBase Connection Success`.
4. Start the frontend.
5. Register an author and publish the first article.
