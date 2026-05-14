# Blog App Frontend

React frontend for the Blog App. It provides the reader, author, admin login flow, article pages, profile settings, themes, and API integration with the Express backend.

## Frontend Stack

- React 19
- Vite 7
- React Router 7
- React Router DOM 7
- Tailwind CSS 4
- `@tailwindcss/vite`
- Zustand
- Axios
- React Hook Form
- React Hot Toast
- ESLint

## Frontend Dependencies

### Runtime Dependencies

```json
{
  "@tailwindcss/vite": "^4.2.1",
  "axios": "^1.13.6",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-hook-form": "^7.71.2",
  "react-hot-toast": "^2.6.0",
  "react-router": "^7.13.1",
  "react-router-dom": "^7.13.1",
  "tailwindcss": "^4.2.1",
  "zustand": "^5.0.11"
}
```

### Development Dependencies

```json
{
  "@eslint/js": "^9.39.1",
  "@types/react": "^19.2.7",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^5.1.1",
  "eslint": "^9.39.1",
  "eslint-plugin-react-hooks": "^7.0.1",
  "eslint-plugin-react-refresh": "^0.4.24",
  "globals": "^16.5.0",
  "vite": "^7.3.1"
}
```

## Folder Structure

```text
frontend/
├── public/
├── src/
│   ├── assets/                # Static React assets
│   ├── components/            # Page and UI components
│   │   ├── AdminDashboard.jsx
│   │   ├── ArticleByID.jsx
│   │   ├── AuthorArticles.jsx
│   │   ├── AuthorDashboard.jsx
│   │   ├── AuthorProfile.jsx
│   │   ├── EditArticleForm.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── RootLayout.jsx
│   │   ├── Settings.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── UserProfile.jsx
│   │   └── WriteArticle.jsx
│   ├── lib/
│   │   └── api.js             # Axios client and token interceptor
│   ├── stores/
│   │   ├── authStore.js       # Zustand auth/session store
│   │   └── settingsStore.js   # Theme/settings store
│   ├── styles/
│   │   └── common.js          # Shared Tailwind class names
│   ├── App.jsx                # Router setup
│   ├── index.css              # Tailwind import and theme variables
│   └── main.jsx               # React entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Environment Variables

Create a `.env` file inside `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:10000
```

If `VITE_API_BASE_URL` is not set, the app falls back to the deployed backend URL configured in `src/lib/api.js`.

## How To Start The Frontend

Install dependencies:

```bash
cd frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server with hot reload.

```bash
npm run build
```

Creates a production build in `dist/`.

```bash
npm run preview
```

Serves the production build locally for testing.

```bash
npm run lint
```

Runs ESLint across the frontend source code.

## Routes

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | `Home` | Landing/home page |
| `/register` | `Register` | Register as user or author |
| `/login` | `Login` | Login as user or author |
| `/user-profile` | `UserProfile` | Reader profile and active article grid |
| `/author-profile` | `AuthorProfile` | Author area with nested article routes |
| `/author-profile/articles` | `AuthorArticles` | Author's own active articles |
| `/author-profile/write-article` | `WriteArticle` | Create new article |
| `/article/:id` | `ArticleByID` | Read full article, comment, edit/delete if author |
| `/edit-article/:id` | `EditArticleForm` | Edit an author's article |
| `/settings` | `Settings` | Profile and theme settings |
| `/admin-dashboard` | `AdminDashboard` | Admin landing area |

## Key Features

- Role selection during registration and login.
- User registration through `/user-api/users`.
- Author registration through `/author-api/users`.
- Shared login through `/common-api/login`.
- Auth token storage in `localStorage`.
- Authorization header automatically added through the Axios interceptor.
- Cookie-based backend auth support with `withCredentials: true`.
- Session restore through `/common-api/check-auth`.
- Logout through `/common-api/logout`.
- Reader article grid.
- Author article grid.
- Article detail page.
- Comment form for users.
- Author-only edit and delete actions.
- Profile settings page.
- Light, warm, and dark themes using CSS variables.
- Toast notifications for login, article, comment, and settings actions.

## API Client

The Axios client is created in `src/lib/api.js`:

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://blog-app-backend-hdx7.onrender.com";
```

It also sends:

- `withCredentials: true` for cookie support.
- `Authorization: Bearer <token>` when `authToken` exists in local storage.

## Styling

The frontend uses Tailwind CSS 4 and CSS variables. Theme colors are defined in `src/index.css`:

- Default light theme
- Warm theme
- Dark theme

The selected theme is stored in local storage under `blogSettings`.

## Recommended Development Flow

1. Start the backend first.
2. Set `VITE_API_BASE_URL` to the backend URL.
3. Run `npm run dev`.
4. Register an author and publish an article.
5. Register a user and test reading/commenting.
6. Run `npm run build` before deployment.

## Deployment

The project root has `vercel.json` configured for the frontend:

```json
{
  "installCommand": "cd frontend && npm install",
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist"
}
```

In Vercel, add:

```env
VITE_API_BASE_URL=https://your-backend-url
```
