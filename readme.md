# SSIMHS Server

SSIMHS Server is a Node.js and Express API for the SSIMHS project. It uses MongoDB through Mongoose and is organized around content modules for banners, notices, campus highlights, news, and student activities.

This repository is still under development.

## Project Structure

- `src/server.js` starts the application after connecting to MongoDB.
- `src/app.js` defines the Express app, middleware, routes, and health check.
- `src/config/db.config.js` handles the MongoDB connection.
- `src/controllers/`, `src/models/`, and `src/routes/` hold the feature modules.
- `public/index.html` is included in the repository as a static frontend entry point.

## Requirements

- Node.js 18+ recommended
- MongoDB instance or MongoDB Atlas connection string

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with at least:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

3. Start the server:

   ```bash
   npm start
   ```

## Available API Routes

- `GET /api/health` - health check
- `GET /api/v1/banners`
- `GET /api/v1/notices`
- `GET /api/v1/campus-highlights`
- `GET /api/v1/news`
- `GET /api/v1/student-activities`

Each module also supports the usual create, update, and delete operations where implemented in its controller and route files.

## Notes

- Requests are protected with common security middleware such as Helmet, CORS, rate limiting, and MongoDB sanitization.
- The app currently runs in development mode through `nodemon`.
