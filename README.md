# Formai Monorepo

AI-powered form generation with Google Forms export. This monorepo contains the production backend (Express/Node, TypeScript, MongoDB) and frontend (React 19/Vite/Tailwind) that replaced the original serverless implementation.

- Current monorepo (you are here): backend + frontend
- Previous split repos:
  - Backend: https://github.com/abdull-ah-med/formai-backend
  - Frontend: https://github.com/abdull-ah-med/formai-frontend
- Legacy (early serverless implementation): https://github.com/abdull-ah-med/formai-legacy-

Why the migration:
- The project was originally built as a serverless application but hit Vercel's serverless function limits during development.
- Migrated to separate backend/frontend architecture.
- Consolidated into this monorepo for simpler collaboration, versioning, and deployments.

## Repository structure

```
formai/
  package.json          Monorepo root with workspace scripts
  
  backend/              Express + TypeScript API
    src/
      config/           DB connection, Claude system prompt
      controllers/
        auth/           Sign up, sign in, sign out, Google OAuth callback
        account/        Get account, delete account, Google delink, API key management
        formController.ts  Form generation, revision, finalization
      middleware/       JWT auth, rate limiting (auth, form generation, general API)
      models/           Mongoose models (User, Form, Submission)
      routes/           API route definitions
      schemas/          Zod schema for Google Form mapping
      utils/            Claude client, Google Forms service, reCAPTCHA
      types/            Custom type definitions
      index.ts          App bootstrap with health endpoint
    package.json        build/dev scripts
    tsconfig.json

  frontend/             React 19 + Vite app
    src/
      api/              Axios client and API helpers
      auth/             OAuth helpers and auth utilities
      components/
        ui/             UI components (forms, dialogs, buttons, pages)
        GoogleAuthCallback.tsx
        SessionManager.tsx
      contexts/         Auth + Form contexts with providers
      hooks/            useAuth hook
      lib/              Utility functions (cn for classnames)
      schemas/          Yup validation schemas (login, signup)
      types/            App-wide type definitions
      utils/            Helpers (DOM title, form validation)
      routes.tsx        Client routes with protected route handling
    package.json        dev/build/lint scripts
    vite.config.js      dev proxy to backend
    tailwind.config.js  Tailwind with animations
```

## What it does

- Auth
  - Email/password registration and sign in
  - Google OAuth 2.0 (link existing account or sign in)
  - JWT-based auth (token returned by API, saved client-side; cookie set for server use)
  - reCAPTCHA + honeypot to reduce bot signups/logins
  - Multiple rate limiters: auth (10 req/15min), form generation (20 req/hour), general API (100 req/15min)
- AI form generation (Anthropic Claude)
  - Generate a complete form JSON from a natural language prompt
  - Revise iteratively with follow-up prompts
  - Support for user's own Anthropic API key (encrypted at rest)
  - Validation hints and safe content filtering via a strict system prompt
- Google Forms export
  - Map the generated schema into a Google Form using the Google Forms API
  - Supports sections, branching (goTo NEXT_SECTION/SUBMIT_FORM or jump to section title)
  - Persists created form link in user history
- Dashboard UI
  - Preview generated form with validation hints
  - Finalize to Google Forms
  - View form history
  - Manage account, Google linking, and personal API key
- Account management
  - Profile viewing and editing
  - Password management
  - Google account linking/unlinking
  - Anthropic API key management (save/delete)
  - Account deletion

## Tech stack

- Backend: Node.js, Express, TypeScript, Mongoose, Zod, axios, googleapis, google-auth-library, express-rate-limit, helmet, cors, cookie-parser, jsonwebtoken, bcrypt
- Frontend: React 19, Vite, TypeScript, TailwindCSS (with tailwindcss-animate), Formik + Yup, react-router-dom v7, react-google-recaptcha, DOMPurify, Radix UI (dialog, slot), lucide-react, lenis (smooth scroll), js-cookie, jwt-decode, class-variance-authority, clsx, tailwind-merge
- AI: Anthropic Claude (messages API)
- Database: MongoDB (Mongoose ODM)

## Architecture

- Auth flow
  - Email/password: standard login; returns a JWT in response body; backend also sets a secure cookie named `token`. The API accepts either the cookie or `Authorization: Bearer <token>` header.
  - Google OAuth: frontend builds consent URL with scopes (openid, email, profile, forms, drive.file) and optional state (userId) for linking; backend exchanges code, creates/links user, sets cookie + returns token.
- Schema generation
  - `src/utils/claudeClient.ts` calls Claude with a strict system prompt (`src/config/systemPrompt.ts`) to produce minified JSON representing the form.
  - Supports user-provided Anthropic API keys (encrypted with AES-256-CBC) for personalized usage.
  - Zod schema (`src/schemas/formSchema.ts`) validates strict structure before Google API calls.
  - Additional branch metadata is added for the dashboard (non-functional for Forms API, but visible in UI).
- Google Forms export
  - `src/utils/googleFormService.ts` maps internal schema to Google Forms BatchUpdate requests, then patches navigation (goTo) after section item IDs are known.
- Data storage
  - `User` model stores Google tokens and Anthropic API keys encrypted (AES-256-CBC) via `ENCRYPTION_KEY`. Tokens are refreshed if expired during finalize.
  - `Form` stores original/revised schemas and Google Form URL once finalized.
  - `Submission` placeholder model for future responses storage.
- Rate limiting
  - Auth endpoints: 10 requests per 15 minutes per IP
  - Form generation/revision: 20 requests per hour per IP
  - General API: 100 requests per 15 minutes per IP

## API overview

Base URL: `/api`

Auth (`/api/auth`)
- POST `/register` — register user (reCAPTCHA + honeypot)
- POST `/login` — login (reCAPTCHA), returns `{ success, message, token }` and sets `token` cookie
- GET `/google/callback` — OAuth callback (code), sets cookie and returns `{ token, hasFormsScope, hasRefreshToken }`
- POST `/logout` — clears cookie (requires auth)

Account (`/api/account`)
- GET `/` — current user profile (requires auth)
- DELETE `/google-link` — unlink Google (requires password to exist)
- DELETE `/` — delete account and owned forms + submissions
- POST `/api-key` — save Anthropic API key (encrypted)
- DELETE `/api-key` — remove Anthropic API key

Forms (`/api/form`)
- POST `/generate-form` — body: `{ prompt }` → creates a draft form in DB, returns `{ formId, schema }`
- POST `/revise-form/:formId` — body: `{ prompt }` → appends revision, returns updated `{ schema }`
- POST `/finalize-form/:formId` — creates Google Form, returns `{ googleFormUrl }`
- GET `/forms/history` — list of finalized forms for the user

Health & Debug
- GET `/` — API status message
- GET `/health` — health check with timestamp
- GET `/api/protected` — simple auth check
- GET `/api/auth-debug` — debug info about auth/cookies

Notes
- Daily generation limit: up to 3 per user per day (`User.dailyFormCreations`).
- Branching rules: radio/select options must all include `goTo`; `goTo` may be `NEXT_SECTION` | `SUBMIT_FORM` | exact section title.

## Data models (simplified)

User
- `fullName`, `email`, `password?`
- `googleId?`, `googleTokens?` (encrypted `accessToken`, `refreshToken?`, `expiryDate`)
- `anthropicApiKey?` (encrypted with AES-256-CBC)
- `formsHistory[]` (stored final schemas + Google links + responderUri)
- `formsCreated[]` (references to Form documents)
- `dailyFormCreations { count, date }`
- `subscription { tier, stripeCustomerId?, stripeSubscriptionId?, priceId?, status?, currentPeriodEnd?, paymentMethod? }`
- `chatHistory[]` (prompt/response pairs with timestamps)
- `role` (user | admin)

Form
- `userId`, `prompt`, `claudeResponse` (JSON), `revisions[]`, `googleFormUrl?`, `revisionCount`

Submission
- `formId`, `submittedData`

## Environment variables

Backend (`backend/.env`)
- `PORT=4000` — API port
- `MONGODB_URI=...` — MongoDB connection string
- `JWT_SECRET=...` — JWT signing secret
- `FRONTEND_URL=http://localhost:5173` — for CORS and OAuth redirect construction
- `ANTHROPIC_API_KEY=...` — Claude API key
- `GOOGLE_CLIENT_ID=...` — OAuth client (Web application)
- `GOOGLE_CLIENT_SECRET=...`
- `RECAPTCHA_SECRET_KEY=...` — server-side verification
- `ENCRYPTION_KEY=32-byte-secret-string` — exactly 32 chars for AES-256 token encryption
- `NODE_ENV=development` | `production`

Frontend (`frontend/.env`)
- `VITE_API_BASE_URL=http://localhost:4000/api` — API base (Vite dev server proxies `/api` to 4000 by default)
- `VITE_FRONTEND_URL=http://localhost:5173` — used to build Google redirect URI
- `VITE_GOOGLE_CLIENT_ID=...` — from Google Cloud
- `VITE_RECAPTCHA_SITE_KEY=...` — client-site key

Google OAuth
- Authorized redirect URI must be: `${VITE_FRONTEND_URL}/auth/google/callback` (e.g., `http://localhost:5173/auth/google/callback` in dev)
- Scopes used: `openid email profile https://www.googleapis.com/auth/forms https://www.googleapis.com/auth/drive.file`

CORS & cookies
- Backend CORS `origin` is set from `FRONTEND_URL`. Set it for each environment.
- Cookies for auth use `SameSite=None; Secure` in production — requires HTTPS on both frontend and backend.

## Local development

1) Prerequisites
- Node.js 18+
- MongoDB instance
- Google Cloud OAuth client (Web), reCAPTCHA keys, Anthropic API key

2) Configure envs
- Copy `backend/.env.example` to `backend/.env` and fill in values
- Copy `frontend/.env.example` to `frontend/.env` and fill in values

3) Install dependencies

Backend
```
cd backend
npm install
```

Frontend
```
cd frontend
npm install
```

4) Run

Backend (Express + TS with reload)
```
cd backend
npm run dev
```

Frontend (Vite dev server)
```
cd frontend
npm run dev
```

Vite dev is configured to proxy `/api` → `http://localhost:4000`.

Alternatively, from the repo root you can use the helper scripts:

Root install
```
npm run install:all
```

Run both backend and frontend together
```
npm run dev
```

## Deployment (high level)

- Backend: currently deployed on Azure App Service with CI/CD via GitHub Actions. Can also be deployed to other Node hosts (Render, Fly.io, VPS, etc.). Provide the same `.env` values and ensure HTTPS if using cookies cross-site.
- Frontend: deploy to Vercel/Netlify/Static host. Configure `VITE_*` envs and point to the API base URL.
- CORS: set `FRONTEND_URL` on the backend to the deployed frontend origin.
- OAuth: set production redirect URI in Google Cloud to `${public-frontend}/auth/google/callback`.

## Frontend notes

- Major routes: `/` (home), `/signup`, `/signin`, `/auth/google/callback`, `/dashboard`, `/history`, `/account-settings`, `/about`, `/privacy`, `/terms`, `/cookies`, `/pricing`, `/api-key-policy`
- Protected routes: `/dashboard`, `/history`, `/account-settings` — wrapped in `DashboardLayout` and `ProtectedRoute`
- Key UI: `FormBuilder` (preview + revision), `FormFinalizeButton` (permission dialog + reconnect flow), `GoogleAuthCallback` (handles code exchange), `ProtectedRoute` (guards dashboard routes), `DashboardLayout` (shared layout for authenticated pages)
- Components library: Custom `Button`, `Dialog` (using Radix UI), smooth scroll with Lenis
- Security: DOMPurify is used to sanitize rendered strings from generated schemas; Formik + Yup enforce client validation; reCAPTCHA v2/3 supported via `react-google-recaptcha`.
- Styling: TailwindCSS with `tailwindcss-animate`, custom utilities via `class-variance-authority` and `tailwind-merge`

## Backend notes

- `verifyJWT` middleware accepts tokens from cookie or `Authorization` header.
- Rate limiters: `authLimiter` (10/15min), `formGenerationLimiter` (20/hour), `apiLimiter` (100/15min).
- `systemPrompt` enforces safe generation and branching rules; schemas are validated with Zod prior to Google API calls.
- Google tokens and Anthropic API keys are encrypted at rest with AES-256-CBC; refresh attempted on finalize if expired.
- Trust proxy enabled for correct IP handling behind proxies.
- ETag disabled to prevent 304 responses that can break auth checks.
- Health endpoint at `/health` returns status and timestamp.

## Troubleshooting

- 401/403 on finalize: ensure Google is connected; if expired, reconnect via the dialog; check that your OAuth client has Forms + Drive scopes and you receive a refresh token (use `access_type=offline`).
- CORS/auth cookie issues locally: set `FRONTEND_URL=http://localhost:5173` on backend; use the same hostnames and `http://` in dev. In production, both sides must be HTTPS for `SameSite=None; Secure` cookies.
- `ENCRYPTION_KEY` must be exactly 32 characters; otherwise token encryption/decryption will fail.
- Google branching: every radio/select option must include `goTo`; section titles referenced in `goTo` must exist and will be resolved to item IDs during patching.
- Claude errors/timeouts: API calls use increased timeouts for generation/revision. Ensure `ANTHROPIC_API_KEY` and model name are correct.
- API key format: User-provided Anthropic API keys must start with `sk-ant-`.

## Roadmap / ideas

- Form submission storage and analytics (using `Submission` model)
- Team/workspace roles and sharing
- Template gallery and versioning
- More field types and advanced validation mapping to Google Forms

## References
- Backend repo (pre-monorepo): https://github.com/abdull-ah-med/formai-backend
- Frontend repo (pre-monorepo): https://github.com/abdull-ah-med/formai-frontend
- Legacy serverless repo: https://github.com/abdull-ah-med/formai-legacy-

---

This README documents the monorepo that supersedes the split repos. Configure the env variables exactly as shown for a smooth local run and production deployment.
