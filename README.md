# Student Achievement Management System - Full Stack

This **Student Achievement Management System** is designed to manage student projects, achievements, and academic records. It includes a **backend** with Node.js, Express.js, and MongoDB, along with a **frontend** built with React.js for a seamless user experience. **Multer** is used for image storage, and **Axios** facilitates API requests.

## Features
- **User Authentication**: Secure JWT-based authentication.
- **Project Management**: CRUD operations for student projects.
- **Achievement Management**: CRUD operations for achievements.
- **Marks Management**: Manage semester-wise marks.
- **Image Uploads**: Image storage with Multer.
- **Data Validation**: Data validation using Mongoose schemas.

## Tech Stack
- **Node.js** and **Express.js**: Backend and RESTful API.
- **MongoDB** and **Mongoose**: NoSQL database and ODM.
- **React.js**: Frontend for user interactions.
- **Axios**: HTTP client for API requests.
- **JWT**: Secure authentication.
- **Multer**: Middleware for file uploads.

## Prerequisites
- **Node.js** installed
- **MongoDB** installed and running

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/abdulnafih27/Student-Achievement-Management-System.git
cd Student-Achievement-Management-System
```

### 2. Backend Setup

#### Install Dependencies:
```bash
cd Server
npm install
```

#### Set up Environment Variables:
Create a `.env` file in the backend directory:
```
MONGO_URI=mongodb://localhost:27017/achievement-system
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=your_jwt_lifetime
```

#### Start the Backend Server:
```bash
npm start
```
The backend API will be running on `http://localhost:5000`.

### 3. Frontend Setup

#### Install Dependencies:
```bash
cd Frontend
npm install
```

#### Start the Frontend:
```bash
npm run dev
```
The frontend will be running on `http://localhost:3000`.

## API Endpoints

### Authentication
- **POST** `/student/signup` - Register a new user
- **POST** `/student/login` - Login and receive a JWT token

### Projects
- **GET** `/student/projects` - Get all projects for the logged-in user
- **POST** `/student/projects` - Create a new project
- **PUT** `/student/projects/:id` - Update an existing project
- **DELETE** `/student/projects/:id` - Delete a project

### Achievements
- **GET** `/student/achievements` - Get all achievements for the logged-in user
- **POST** `/student/achievements` - Create a new achievement
- **PUT** `/student/achievements/:id` - Update an achievement
- **DELETE** `/student/achievements/:id` - Delete an achievement

### Marks
- **GET** `/student/marks` - Get all semester marks
- **POST** `/student/marks` - Add marks for a semester
- **PUT** `/student/marks/:id` - Update marks for a semester
- **DELETE** `/student/marks/:id` - Delete marks for a semester

## Folder Structure
```
/backend
├── /models        # Mongoose models for User, Project, Achievement, Marks
├── /routes        # API routes for authentication, projects, achievements, marks
├── /middlewares   # JWT authentication middleware
├── /controllers   # Logic for handling requests
├── /db            # MongoDB connection setup
└── server.js      # Main entry point for the backend

/frontend
├── /components    # React components for different pages and features
├── /pages
├── App.js         # Main app component
└── index.js       # React entry point
```

## Contributing
Feel free to fork this repository, report issues, and submit pull requests!

