# Shree Mahaveer Inchal Catering Services

A robust, full-stack MERN application designed to streamline catering service management. This platform enables users to explore menus, book events, and manage their profiles, while providing administrators with a powerful dashboard for real-time booking management.

## 🚀 Key Features


### 👤 User Features
- **Authentication**: Secure Login, Registration, and Password Reset flows (JWT-based).
- **Booking System**: Easy-to-use interface to book catering for Weddings, Corporate events, etc.
- **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop.
- **Notifications**: Email confirmations for successful bookings.
- **Pages**: Home, Menu, Services, Gallery, About Us, Contact.

### 🛡️ Admin Features
- **Dashboard**: Centralized view of all bookings.
- **Real-Time Updates**: Instant notifications of new bookings using **Socket.IO** (no page refresh needed).
- **Management**: Approve, Reject, or Update booking statuses.

### ⚙️ Technical Highlights
- **Performance**: 
  - **React Lazy Loading** & Suspense for fast initial load times.
  - **Gzip Compression** on the backend for reduced data transfer.
- **Security**: 
  - **Helmet** for secure HTTP headers.
  - **MongoSanitize** to prevent NoSQL injection.
  - **HPP** (HTTP Parameter Pollution) protection.
  - **CORS** configuration for secure cross-origin requests.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19
- **Routing**: React Router DOM v7
- **Styling**: Vanilla CSS / Custom Styles
- **State Management**: React Context API
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Real-Time**: Socket.IO
- **Email**: Nodemailer

---

## 🔧 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` files.

### Backend (`/backend/.env`)
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

# Email Configuration (Gmail Example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_FROM=your_email@gmail.com
OWNER_EMAIL=owner_email@gmail.com
```

### Frontend (`/frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Sachin`s-Catering-Services
```

### 2. Backend Setup
```bash
cd backend
npm install
# Ensure you create the .env file as shown above
npm start
```
*The server will start on port 5000.*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
*The application will open on http://localhost:3000.*

---

## 📦 Project Structure

```bash
Sachin`s-Catering-Services/
├── backend/
│   ├── src/
│   │   ├── config/         # DB & Environment config
│   │   ├── controllers/    # Route logic
│   │   ├── middleware/     # Auth, Security, Error handling
│   │   ├── models/         # Mongoose Schemas (User, Booking, etc.)
│   │   ├── routes/         # API Routes
│   │   ├── utils/          # Email service, Helpers
│   │   ├── server.js       # Express App Entry Point
│   │   └── socket.js       # Socket.IO Socket Manager
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/         # Images, Fonts
│   │   ├── components/     # Reusable Components (Header, Footer)
│   │   ├── context/        # Auth Context
│   │   ├── pages/          # Page Views (Home, Login, Dashboard)
│   │   ├── services/       # API Calls (Axios)
│   │   └── App.js          # Main Component with Lazy Loading
│   └── package.json
└── README.md
```

## 📄 License
This project is licensed under the ISC License.
