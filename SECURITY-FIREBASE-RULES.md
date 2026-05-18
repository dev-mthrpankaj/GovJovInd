# Firebase Security Rules

Firebase web config in `JS/firebase-config.js` is public by nature. The API key is not a server secret, but the project must be protected with Firebase Authorized domains plus strict Realtime Database and Firestore rules.

## Recommended Realtime Database Rules

These rules keep user profiles limited to the signed-in user. Visitor counter paths remain readable so the existing footer counter can display, and public visitor writes are narrowly validated for the current static frontend. This is a compatibility compromise, not a substitute for server-side abuse protection.

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid",
        "name": { ".validate": "!newData.exists() || (newData.isString() && newData.val().length <= 80)" },
        "email": { ".validate": "!newData.exists() || (newData.isString() && newData.val().length <= 160)" },
        "mobile": { ".validate": "!newData.exists() || (newData.isString() && newData.val().matches(/^\\d{10}$/))" },
        "photoURL": { ".validate": "!newData.exists() || (newData.isString() && newData.val().length <= 500)" },
        "provider": { ".validate": "!newData.exists() || (newData.isString() && newData.val().length <= 80)" },
        "role": { ".validate": "!newData.exists() || newData.val() === 'user'" },
        "createdAt": { ".validate": "!newData.exists() || newData.isNumber()" },
        "updatedAt": { ".validate": "!newData.exists() || newData.isNumber()" },
        "lastLoginAt": { ".validate": "!newData.exists() || newData.isNumber()" },
        "$other": { ".validate": false }
      }
    },
    "siteStats": {
      ".read": true,
      "totalPageViews": {
        ".write": true,
        ".validate": "newData.isNumber() && ((!data.exists() && newData.val() === 1) || (data.exists() && newData.val() === data.val() + 1))"
      },
      "totalUniqueVisitors": {
        ".write": true,
        ".validate": "newData.isNumber() && ((!data.exists() && newData.val() === 1) || (data.exists() && newData.val() === data.val() + 1))"
      },
      "lastUpdated": {
        ".write": true,
        ".validate": "newData.isNumber()"
      },
      "$other": { ".validate": false }
    },
    "dailyStats": {
      "$date": {
        ".read": true,
        "totalPageViews": {
          ".write": "$date.matches(/^\\d{4}-\\d{2}-\\d{2}$/)",
          ".validate": "newData.isNumber() && ((!data.exists() && newData.val() === 1) || (data.exists() && newData.val() === data.val() + 1))"
        },
        "uniqueVisitors": {
          ".write": "$date.matches(/^\\d{4}-\\d{2}-\\d{2}$/)",
          ".validate": "newData.isNumber() && ((!data.exists() && newData.val() === 1) || (data.exists() && newData.val() === data.val() + 1))"
        },
        "lastUpdated": {
          ".write": "$date.matches(/^\\d{4}-\\d{2}-\\d{2}$/)",
          ".validate": "newData.isNumber()"
        },
        "$other": { ".validate": false }
      }
    },
    "visitorIndex": {
      "$visitorId": {
        ".read": false,
        ".write": "$visitorId.matches(/^v_[A-Za-z0-9_-]{8,80}$/)",
        "firstSeen": { ".validate": "!newData.exists() || newData.isNumber()" },
        "lastSeen": { ".validate": "!newData.exists() || newData.isNumber()" },
        "firstPage": { ".validate": "!newData.exists() || (newData.isString() && newData.val().length <= 240)" },
        "lastPage": { ".validate": "!newData.exists() || (newData.isString() && newData.val().length <= 240)" },
        "referrer": { ".validate": "!newData.exists() || (newData.isString() && newData.val().length <= 240)" },
        "userAgent": { ".validate": "!newData.exists() || (newData.isString() && newData.val().length <= 360)" },
        "$other": { ".validate": false }
      }
    },
    "presence": {
      ".read": true,
      "$visitorId": {
        "$sessionId": {
          ".write": "$visitorId.matches(/^v_[A-Za-z0-9_-]{8,80}$/) && $sessionId.matches(/^s_[A-Za-z0-9_-]{8,80}$/)",
          "online": { ".validate": "newData.isBoolean()" },
          "connectedAt": { ".validate": "newData.isNumber()" },
          "page": { ".validate": "!newData.exists() || (newData.isString() && newData.val().length <= 240)" },
          "$other": { ".validate": false }
        }
      }
    }
  }
}
```

## Safer Future Realtime Database Target

For stronger security, move visitor counting writes to a trusted backend and set `siteStats`, `dailyStats`, `visitorIndex`, and `presence` writes to `false`. Keep only public reads needed for displayed aggregate counters.

## Firestore Rules Also Needed

Quiz history uses Firestore under `users/{uid}/quizAttempts`. Apply Firestore rules separately:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /quizAttempts/{attemptId} {
        allow read: if request.auth != null && request.auth.uid == userId;
        allow create, update: if request.auth != null
          && request.auth.uid == userId
          && request.resource.data.userId == userId;
        allow delete: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```
