# Target Account Matching

A web application for managing and tracking target company accounts with match scoring functionality. This application helps users identify and manage potential target accounts based on match scores.

## Features

- **User Authentication**: Secure login system with JWT token-based authentication
- **Account Management**: View, create, and manage company accounts
- **Match Scoring**: Each company account has a match score indicating its potential as a target
- **Status Tracking**: Mark accounts as "Target" or "Not Target" to track your sales pipeline
- **Responsive UI**: Modern, responsive interface built with React and Tailwind CSS

## Tech Stack

### Frontend
- React 18
- TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas account)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/target-account-matching.git
   cd target-account-matching
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5002
   ```

4. Seed the database with demo data:
   ```bash
   node backend/scripts/seedDB.js
   ```

## Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:
```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

### Production Build

Build the frontend:
```bash
npm run build:frontend
```

## API Endpoints

### Authentication
- `POST /api/login` - Authenticate user and get token
- `POST /api/register` - Register a new user (for development purposes)

### Accounts
- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/:id` - Get account by ID
- `POST /api/accounts` - Create a new account
- `POST /api/accounts/:id/status` - Update account status

## Demo Credentials

Use these credentials to log in to the demo application:
- Username: `user1`
- Password: `pass123`

## Project Structure

The project follows a standard structure with backend and frontend code separated:

- Backend code is in the `backend` directory
- Frontend code is in the `src` directory
- Configuration files are in the root directory

## Data Models

### Account
The main entity in the system represents company accounts with the following key fields:
- Company name
- Match score (0-100)
- Status (Target/Not Target)
- Creation and update timestamps

## License

This project is licensed under the MIT License.
