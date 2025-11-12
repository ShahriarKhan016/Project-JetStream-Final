# JetStream API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication using JWT tokens.

### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## Authentication Endpoints

### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "displayName": "string"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "username": "string",
      "email": "string",
      "displayName": "string"
    },
    "token": "string"
  }
}
```

### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "string"
  }
}
```

---

## Track Endpoints

### Get All Tracks
```http
GET /api/tracks
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `genre` (optional): Filter by genre

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "tracks": [...],
    "pagination": {
      "total": 100,
      "page": 1,
      "pages": 5
    }
  }
}
```

### Get Track by ID
```http
GET /api/tracks/:id
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "artist": "string",
    "album": "string",
    "duration": 240,
    "coverArt": "string",
    "audioUrl": "string"
  }
}
```

### Search Tracks
```http
POST /api/tracks/search
```

**Request Body:**
```json
{
  "query": "string",
  "filters": {
    "genre": ["pop", "rock"],
    "year": [2020, 2023]
  }
}
```

---

## Playlist Endpoints

### Get User Playlists
```http
GET /api/playlists
```

### Create Playlist
```http
POST /api/playlists
```

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "isPublic": true,
  "tracks": ["trackId1", "trackId2"]
}
```

### Update Playlist
```http
PUT /api/playlists/:id
```

### Delete Playlist
```http
DELETE /api/playlists/:id
```

---

## Recommendation Endpoints

### Get Recommended Tracks
```http
GET /api/recommendations/tracks
```

**Query Parameters:**
- `mood` (optional): Filter by mood
- `limit` (optional): Number of tracks (default: 10)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "tracks": [...],
    "reason": "Based on your listening habits",
    "confidence": 0.85
  }
}
```

---

## User Endpoints

### Get User Profile
```http
GET /api/users/profile
```

### Update Profile
```http
PUT /api/users/profile
```

**Request Body:**
```json
{
  "displayName": "string",
  "bio": "string",
  "avatar": "string"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

### Common Error Codes
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

---

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per window

When rate limit is exceeded:
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

---

## WebSocket Events (Coming Soon)

Real-time features will use WebSocket connections:

- `player:update` - Playback state changes
- `playlist:update` - Playlist modifications
- `chat:message` - Collaborative listening

---

## Pagination

List endpoints support pagination:

**Query Parameters:**
- `page`: Page number (1-indexed)
- `limit`: Items per page (max: 100)

**Response includes:**
```json
{
  "pagination": {
    "total": 1000,
    "page": 1,
    "pages": 50,
    "hasMore": true
  }
}
```

---

For more information, see the [GitHub repository](https://github.com/yourusername/jetstream).
