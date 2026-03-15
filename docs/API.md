## API Reference

Base URL: `https://authkit-zm0k.onrender.com/api/v1` or `http://localhost:8000/api/v1`

---

### POST `/auth/register`

Login or register a user via an OAuth provider (Google or GitHub). If the user does not exist, they are created. If they do, their record is returned as-is (upsert).

**Request Body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | `true` | User's full name from OAuth profile |
| email | string | `true` | User's email from OAuth profile |
| provider | string | `true` | OAuth provider — `GOOGLE` or `GITHUB` |
| imageUrl | string | `false` | Profile picture URL from OAuth profile |

**Example Request**
```json
{
  "name": "Shivam",
  "email": "shivamkumardev01@gmail.com",
  "provider": "GOOGLE",
  "imageUrl": "https://lh3.googleusercontent.com/..."
}
```

**Example Response — 200 OK**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "data": {
    "token": "eyJhbGci...",
    "name": "Shivam",
    "email": "shivamkumardev01@gmail.com"
  }
}
```

**Error Responses**

| Status | Message |
|--------|---------|
| 400 | `"Invalid provider"` |
| 400 | `"Name is required"` |
| 400 | `"Email is required""` |
| 500 | `"Internal server error"` |

---

### POST `/auth/send-otp`

Generates a 4-digit OTP, stores it in Redis with a 10-minute TTL, and sends it to the provided email address.

**Request Body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | `true` | Email address to send the OTP to |
| isSignup | boolean | `true` | `true` for signup, `false` for login |

**Example Request**
```json
{
  "email": "shivamkumardev01@gmail.com",
  "isSignup": false
}
```

**Example Response — 200 OK**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

**Error Responses**

| Status | Message |
|--------|---------|
| 400 | `"A user with this email already exists"` — returned when `isSignup: true` and email is already registered |
| 404 | `"No user found with this email"` — returned when `isSignup: false` and email is not registered |
| 500 | `"Internal server error"` |

---

### POST `/auth/email`

Verifies the OTP entered by the user. On success, creates the user (signup) or fetches them (login) and returns a JWT token.

**Request Body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | `true` | User's email address |
| otp | number | `true` | 4-digit OTP received via email |
| isSignup | boolean | `true` | `true` for signup, `false` for login |
| name | string | `false` | Required only when `isSignup: true` |

**Example Request — Signup**
```json
{
  "name": "Shivam",
  "email": "shivamkumardev01@gmail.com",
  "otp": 7281,
  "isSignup": true
}
```

**Example Request — Login**
```json
{
  "email": "shivamkumardev01@gmail.com",
  "otp": 7281,
  "isSignup": false
}
```

**Example Response — 200 OK**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "data": {
    "token": "eyJhbGci...",
    "name": "Shivam",
    "email": "shivamkumardev01@gmail.com"
  }
}
```

**Error Responses**

| Status | Message |
|--------|---------|
| 400 | `"OTP expired or not found"` — OTP has expired (TTL exceeded) or was never issued |
| 400 | `"Invalid OTP"` — OTP does not match |
| 400 | `"Name is required for signup"` — `isSignup: true` but `name` not provided |
| 404 | `"No user found with this email"` — login attempted for unregistered email |
| 500 | `"Internal server error"` |

---

### GET `/health`

Returns the current health status of the server including uptime, memory usage, and system load. No authentication required.

**Example Response — 200 OK**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "uptime": "2h 14m 37s",
    "server": {
      "node": "v20.11.0",
      "environment": "production"
    },
    "memory": {
      "system": {
        "total": "512 MB",
        "free": "128 MB"
      },
      "process": {
        "heapUsed": "42 MB",
        "heapTotal": "67 MB",
        "rss": "75 MB"
      }
    },
    "load": [0.12, 0.08, 0.05]
  }
}
```

**Error Responses**

| Status | Message |
|--------|---------|
| 500 | `"Internal server error"` |