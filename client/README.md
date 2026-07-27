# RoadWatch — Frontend

React (Vite) frontend for a road-damage reporting platform. Talks exclusively to your
existing Express/MongoDB backend over Axios — no mock data, no fake auth, no local server.

## Setup

```bash
npm install
cp .env.example .env   # then set VITE_API_BASE_URL to your backend, e.g. http://localhost:5000/api
npm run dev
```

## ⚠️ Before you run this against your real backend

I do not have your actual Express route list, so every endpoint is assumed using
standard REST conventions. **All of them live in one file: `src/utils/endpoints.js`.**
Nothing else in the app hardcodes a URL — every service (`src/services/*.js`) imports
from that file, so fixing a mismatched route is a one-line edit in one place.

Assumed routes:

| Feature | Method | Path |
|---|---|---|
| Register | POST | `/auth/register` |
| Login | POST | `/auth/login` |
| Logout | POST | `/auth/logout` |
| Get current user | GET | `/auth/me` |
| Update profile | PUT | `/users/profile` |
| Create report | POST | `/reports` (multipart: `title, description, category, severity, address, lat, lng, images[], video`) |
| Update report | PUT | `/reports/:id` (multipart) |
| Get all reports | GET | `/reports` (query: `search, status`) |
| My reports | GET | `/reports/my-reports` (query: `status, limit, sort`) |
| Nearby reports | GET | `/reports/nearby` (query: `lat, lng, radiusKm`) |
| Get one report | GET | `/reports/:id` |
| Delete report | DELETE | `/reports/:id` |
| Verify report (admin) | PATCH | `/reports/:id/verify` |
| Resolve report (admin) | PATCH | `/reports/:id/resolve` |
| All users (admin) | GET | `/users` |
| Delete user (admin) | DELETE | `/users/:id` |
| Admin dashboard stats | GET | `/admin/stats` |

Also assumed:
- JWT is returned as `{ token, user }` on login/register and stored in `localStorage`,
  sent as `Authorization: Bearer <token>` on every request (see `src/services/axiosInstance.js`).
- `user.role` is either `"citizen"` or `"admin"`.
- A report has: `title, description, category, severity, address, status
  ("pending" | "verified" | "resolved"), location: { lat, lng }, images: [url],
  video: url, reportedBy`.
- Cloudinary URLs come back already-hosted in the `images`/`video`/`avatar` fields —
  the frontend just displays them, all uploads go through Multer/Cloudinary on your backend.

**Please confirm or correct these against your real Express routes** — send me the actual
route list (or your routes file) and I'll update `endpoints.js` and any field-name
mismatches to match exactly.

## Folder structure

```
src/
  assets/        static assets
  components/    reusable UI (Navbar, ReportCard, ReportForm, MapView, uploaders, icons…)
  context/       AuthContext, ThemeContext
  hooks/         useAuth, useTheme, useGeolocation, useDebounce
  layouts/       MainLayout, AuthLayout, AdminLayout
  pages/         one file per route, pages/admin/ for admin-only views
  routes/        AppRoutes + ProtectedRoute / GuestRoute / AdminRoute guards
  services/      axiosInstance + one service module per resource
  styles/        Tailwind entrypoint
  utils/         endpoints.js (route registry), errorHandler.js
```

## Notes

- Global error handling for 401 / 403 / 404 / 500 lives in `axiosInstance.js`'s response
  interceptor — every failure gets a `friendlyMessage`, shown via `handleApiError()` +
  React Toastify, and a 401 clears the local session automatically.
- `ErrorBoundary` wraps the whole app so a render error never blanks the screen.
- Map tiles are OpenStreetMap (no API key required). Swap the `TileLayer` URL in
  `MapView.jsx` if you have a preferred provider.
