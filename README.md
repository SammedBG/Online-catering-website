# Sachin's Catering Services

Sachin's Catering Services is a full-stack web application designed to manage catering services efficiently. It provides features for customers to book catering services, leave reviews, and for administrators to manage bookings and user data.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Features

### Backend
- RESTful API built with Express.js.
- User authentication and authorization using JSON Web Tokens (JWT).
- Role-based access control for admin and user functionalities.
- MongoDB database integration using Mongoose.
- Email notifications for booking confirmations.
- Secure password hashing with bcrypt.

### Frontend
- React-based single-page application.
- Responsive design for mobile and desktop users.
- Dynamic booking and review management.
- Integration with backend APIs for real-time data updates.
- User-friendly interface for both customers and administrators.

---

## Project Structure

```
Sachin`s-Catering-Services/
├── backend/
│   ├── .env
│   ├── package.json
│   ├── src/
│   │   ├── server.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
├── frontend/
│   ├── .env
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       └── utils/
└── README.md
```

---

## Getting Started

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and configure the required environment variables (see [Environment Variables](#environment-variables)).

4. Start the backend server:
   ```bash
   npm start
   ```
   The backend server runs on `http://localhost:5000` by default.

5. For development mode with hot-reloading, use:
   ```bash
   npm run dev
   ```

---

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and configure the required environment variables (see [Environment Variables](#environment-variables)).

4. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend application runs on `http://localhost:3000` by default.

---

## Scripts

### Backend

- `npm start`: Starts the backend server.
- `npm run dev`: Starts the backend server in development mode with hot-reloading (requires `nodemon`).

### Frontend

- `npm start`: Starts the React development server.
- `npm run build`: Builds the React application for production.
- `npm test`: Runs tests for the React application.

---

## Environment Variables

### Backend

Create a `.env` file in the `backend` directory with the following variables:

```
PORT=5000
DATABASE_URL=<your-mongodb-connection-string>
JWT_ACCESS_SECRET=<your-jwt-access-secret>
JWT_REFRESH_SECRET=<your-jwt-refresh-secret>
EMAIL_USER=<your-email-address>
EMAIL_PASS=<your-email-password>
```

### Frontend

Create a `.env` file in the `frontend` directory with the following variable:

```
REACT_APP_API_URL=http://localhost:5000
```

---

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Nodemailer
- bcrypt for password hashing
- dotenv for environment variable management

### Frontend
- React
- Context API for state management
- CSS for styling
- Axios for API requests

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
