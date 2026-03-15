# Database Schema

Managed via Prisma. Schema lives at `server/prisma/schema.prisma`.

---

## User

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String` | UUID, primary key |
| `name` | `String?` | User's display name — optional for OAuth users |
| `email` | `String` | Unique email address |
| `imageUrl` | `String?` | Profile picture URL — populated from OAuth |
| `provider` | `AuthProvider` | How the user signed up — `GOOGLE`, `GITHUB`, or `EMAIL` |
| `role` | `UserRole` | Access level — defaults to `USER` |
| `createdAt` | `DateTime` | Timestamp of account creation |
| `updatedAt` | `DateTime` | Timestamp of last update |

---

## Enums

### `AuthProvider`
| Value | Description |
|-------|-------------|
| `GOOGLE` | Signed up via Google OAuth |
| `GITHUB` | Signed up via GitHub OAuth |
| `EMAIL` | Signed up via Email + OTP |

### `UserRole`
| Value | Description |
|-------|-------------|
| `USER` | Standard user — default role |
| `ADMIN` | Admin user — elevated permissions |

---

## Prisma Schema
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