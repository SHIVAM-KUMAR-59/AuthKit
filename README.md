![Banner image](/Banner.png)
# AuthKit

> Production-ready authentication boilerplate for rapid integration — built for hackathons, side projects, and beyond.

Full-stack authentication starter with **Next.js** + **Express** + **Supabase** + **Redis**, supporting Google, GitHub, and Email OTP login out of the box. Clone it, configure your keys, and have auth running in minutes.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)
![Redis](https://img.shields.io/badge/Redis-OTP_Storage-DC382D?style=flat-square&logo=redis)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)

---

## Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Auth Flows](#auth-flows)
- [API Reference](#api-reference)
- [Email Setup](#email-setup)
- [Contributing](#contributing)

---

## Features

- **Google OAuth** — one-click sign in with Google
- **GitHub OAuth** — one-click sign in with GitHub
- **Email + OTP** — passwordless login and signup via 4-digit OTP
- **OTP Expiry** — OTPs stored in Redis with a 10-minute TTL
- **JWT Sessions** — stateless sessions via NextAuth JWT strategy
- **Prisma + Supabase** — type-safe database access on PostgreSQL
- **Nodemailer (dev) + Resend (prod)** — Nodemailer locally, Resend in production
- **Role-based** — `USER` and `ADMIN` roles baked in
- **Prettier** — consistent formatting on both frontend and backend
- **Fully typed** — end-to-end TypeScript with no `any` shortcuts

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS, NextAuth.js |
| **Backend** | Node.js, Express 5, TypeScript, ts-node-dev |
| **Database** | PostgreSQL (Supabase), Prisma ORM |
| **Cache / OTP** | Redis (ioredis) |
| **Email (dev)** | Nodemailer (local SMTP) |
| **Email (prod)** | Resend |
| **Auth** | NextAuth.js (Google, GitHub, Credentials) |
| **Code Style** | Prettier |

---

## Project Structure
```
authkit/
├── client/                     # Next.js frontend
│   ├── app/
│   │   ├── api/auth/[...nextauth]/
│   │   │   └── route.ts        # NextAuth handler
│   │   └── auth/
│   │       └── login/
│   │           └── page.tsx    # Login page
│   ├── config/
│   │   └── constants.ts        # Frontend env constants
│   ├── utils/
│   │   └── axios.ts            # Axios instance with interceptors
│   ├── types/
│   │   └── next-auth.d.ts      # NextAuth type extensions
│   └── .env.local
│
├── server/                     # Express backend
│   ├── config/
│   │   ├── constants.config.ts
│   │   ├── logger.config.ts
│   │   ├── redis.config.ts
│   │   └── mail.config.ts
│   ├── controllers/
│   │   └── auth/
│   │       ├── register.controller.ts
│   │       ├── sendOtp.controller.ts
│   │       └── emailAuth.controller.ts
│   ├── services/
│   │   └── auth/
│   │       ├── register.service.ts
│   │       ├── sendOtp.service.ts
│   │       ├── emailAuth.service.ts
│   │       └── verifyOtp.service.ts
│   ├── repositories/
│   │   └── user/
│   │       └── user.repository.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── reqBody.middleware.ts
│   │   ├── logger.middleware.ts
│   │   └── errorHandler.middleware.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   ├── utils/
│   │   ├── error.utils.ts
│   │   ├── jwt.util.ts
│   │   ├── otp.util.ts
│   │   ├── mail.util.ts
│   │   └── types/
│   │       ├── express.types.ts
│   │       └── common.types.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── index.ts
│   └── .env
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- A [Supabase](https://supabase.com) project (free tier works)
- A [Redis](https://redis.io) instance — local or [Upstash](https://upstash.com) (free tier)
- Google OAuth credentials — [Google Cloud Console](https://console.cloud.google.com)
- GitHub OAuth credentials — [GitHub Developer Settings](https://github.com/settings/developers)
- **Locally:** an SMTP email account (Gmail works)
- **In production:** a [Resend](https://resend.com) account with a verified domain

---

### 1. Clone the repository
```bash
git clone https://github.com/SHIVAM-KUMAR-59/authkit.git
cd authkit
```

### 2. Setup the backend
```bash
cd server
npm install
.env
```

Fill in your `.env` — see [Environment Variables](#environment-variables).
```bash
npx prisma migrate dev --name init
npm run dev
```

Backend runs on `http://localhost:8000`

### 3. Setup the redis server
```bash
cd server # if you are not in server already
redis-server
```

Redis runs on `PORT: 6379`

### 4. Setup the frontend
```bash
cd client
npm install
.env.local
```

Fill in your `.env.local`.
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## Environment Variables

### Backend — `server/.env`
```env
# Server
PORT=8000
NODE_ENV=development

# Database — Supabase
DATABASE_URL=postgresql://USER:PASSWORD@HOST:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://USER:PASSWORD@HOST:5432/postgres

# Redis
REDIS_URL=redis://127.0.0.1:6379

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Email — Nodemailer (development only)
SMTP_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Email — Resend (production)
RESEND_API_KEY=re_your_resend_api_key
DOMAIN=https://yourdomain.com
```

### Frontend — `client/.env.local`
```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Backend
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api/v1
```

> **Gmail tip:** Use an [App Password](https://support.google.com/accounts/answer/185833) instead of your real password for `EMAIL_PASS`.

---

## Auth Flows

### Google / GitHub OAuth
```
User clicks "Sign in with Google/GitHub"
  → NextAuth redirects to provider
  → Provider redirects back with profile
  → signIn callback POSTs to /api/v1/auth/register (upsert user)
  → Backend returns JWT token
  → Token stored in NextAuth session
```

### Email + OTP
```
# Sign Up
User enters name + email
  → POST /api/v1/auth/send-otp { email, isSignup: true }
  → OTP generated, stored in Redis (TTL: 10min), emailed to user
  → User enters OTP
  → NextAuth CredentialsProvider → POST /api/v1/auth/email { name, email, otp, isSignup: true }
  → OTP verified, user created in DB, JWT returned
  → Token stored in NextAuth session

# Login
User enters email
  → POST /api/v1/auth/send-otp { email, isSignup: false }
  → OTP emailed to existing user
  → User enters OTP
  → NextAuth CredentialsProvider → POST /api/v1/auth/email { email, otp, isSignup: false }
  → OTP verified, JWT returned
  → Token stored in NextAuth session
```

---

## API Reference

### Auth Routes — `/api/v1/auth`

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | `{ name, email, provider, imageUrl }` | OAuth user upsert |
| `POST` | `/send-otp` | `{ email, isSignup }` | Send OTP to email |
| `POST` | `/email` | `{ name?, email, otp, isSignup }` | Verify OTP + login/signup |

### Responses

**Success**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "data": {
    "token": "eyJhbGci...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error**
```json
{
  "success": false,
  "message": "OTP expired or not found"
}
```

---

## Database Schema
```prisma
model User {
  id        String       @id @default(uuid())
  name      String?
  email     String       @unique
  imageUrl  String?
  provider  AuthProvider
  role      UserRole     @default(USER)
  createdAt DateTime     @default(now())
  updatedAt DateTime     @updatedAt
}

enum UserRole {
  USER
  ADMIN
}

enum AuthProvider {
  GOOGLE
  GITHUB
  EMAIL
}
```

---

## Email Setup

This project uses **Resend** in production and has **Nodemailer** code commented out in `mail.config.ts` for local reference.

### Production — Resend
**Render and most cloud platforms block outbound SMTP ports (465, 587)**, which means Nodemailer will silently fail or throw connection errors in production on these platforms.

To use Resend, add your API key and domain to `server/.env`:
```env
RESEND_API_KEY=re_your_resend_api_key
DOMAIN=https://yourdomain.com
```

Resend is configured in `mail.config.ts` and is active by default.

> **Resend domain tip:** You need to verify your domain in the Resend dashboard and add the required DNS records before emails will send. If you don't have a domain yet, Resend provides a shared `onboarding@resend.dev` address for testing — but this only sends to your own verified email.

### Development — Nodemailer (optional)
The Nodemailer setup is kept as commented code in `mail.config.ts` for reference. If you're deploying to a platform that doesn't block SMTP ports (Railway, Fly.io, a VPS), you can uncomment it and set the following in your `.env`:
```env
SMTP_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

> **Gmail tip:** Use an [App Password](https://support.google.com/accounts/answer/185833) instead of your real password for `EMAIL_PASS`.

### Alternative providers
If you don't want to use Resend or Nodemailer, other transactional email providers that work on Render and similar platforms:

| Provider | Free Tier |
|----------|-----------|
| **SendGrid** | 100 emails/day |
| **Mailgun** | 1,000 emails/month |
| **Brevo** | 300 emails/day |

---

## Contributing

Contributions are welcome — especially if you're adding new auth providers or improving the OTP flow.
```bash
# Fork the repo, then:
git checkout -b feat/your-feature
git commit -m "feat: your feature"
git push origin feat/your-feature
# Open a PR
```

---

<div align="center">
  Built with ❤️ for developers who'd rather be building features than auth
</div>