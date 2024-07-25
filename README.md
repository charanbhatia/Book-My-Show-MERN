# Book My Show - MERN Stack Movie Booking System

## Project Overview

Book My Show is a comprehensive full-stack movie booking system built using the MERN (MongoDB, Express, React, Node.js) stack. This project provides users with a seamless movie ticket booking experience, complete with user authentication and secure payment processing.

## Features

- User-friendly interface for browsing and booking movie tickets
- User authentication system
- Secure payment processing using Stripe
- Efficient state management with Redux
- Robust data storage using MongoDB

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: Redux
- **Payment Processing**: Stripe
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/charanbhatia/Book-My-Show-MERN.git
   cd Book-My-Show-MERN
   ```

2. Install dependencies for both backend and frontend:
   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Start the development servers:
   ```
   # Start backend server
   cd backend
   npm run dev

   # In a new terminal, start frontend server
   cd frontend
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Project Structure

```
Book-My-Show-MERN/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```
