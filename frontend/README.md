# PaisaTrack — Frontend (React + Vite + Tailwind)

Standalone JavaScript frontend for the PaisaTrack expense tracker. Pairs with the Spring Boot + MySQL backend over REST.

## Stack
- React 18 (JavaScript)
- Vite 5
- Tailwind CSS 3
- React Router v6
- Axios
- React Context API (Auth + Expenses state)
- Recharts (charts)
- react-hot-toast (notifications)

## Setup
```bash
npm install
cp .env.example .env       # set VITE_API_BASE_URL to your Spring Boot URL
npm run dev                # http://localhost:5173
npm run build              # production build -> dist/
```

## Folder Structure
```
src/
  assets/            static assets
  components/        reusable UI (Navbar, ProtectedRoute, ExpenseForm, ...)
  context/           AuthContext, ExpenseContext
  hooks/             custom React hooks
  pages/             route-level pages (Login, Register, Dashboard, Expenses, Admin, ...)
  services/          axios client + per-resource API modules
  utils/             formatters & helpers
  App.jsx            router + providers
  main.jsx           entry point
  index.css          Tailwind directives
```

## Backend Contract (REST)
Base URL: `VITE_API_BASE_URL` (e.g. `http://localhost:8080/api`)

| Method | Path | Purpose |
|---|---|---|
| POST | /auth/register | Register |
| POST | /auth/login | Login → `{ token, user }` |
| POST | /auth/google | Google OAuth login |
| POST | /auth/forgot-password | Request reset link |
| POST | /auth/reset-password | Reset password with token |
| GET  | /users/me | Current profile |
| PUT  | /users/me | Update profile |
| GET  | /expenses | List (supports `?search&category&from&to&sort&page`) |
| POST | /expenses | Create |
| PUT  | /expenses/{id} | Update |
| DELETE | /expenses/{id} | Delete |
| GET  | /expenses/stats | Totals, charts data |
| GET  | /income | List income |
| POST | /income | Add income |
| GET  | /savings | Savings goals |
| GET  | /budgets | Budgets |
| GET  | /categories | Categories |
| GET  | /admin/users | (Admin) all users |
| GET  | /admin/stats | (Admin) global stats |

JWT is sent as `Authorization: Bearer <token>` automatically via the axios interceptor in `src/services/api.js`.

## Features Implemented (UI)
Auth (login/register/forgot/reset/Google), Dashboard with stats & charts, Expenses CRUD, search/filter/sort, Income, Savings, Budgets, Categories, Profile, Admin dashboard, Net balance, Recent activity.

Wire each page to the matching Spring Boot endpoint — every API call is centralized in `src/services/`.
