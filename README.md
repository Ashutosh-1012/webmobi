# Node.js Authentication System

A basic authentication system with user registration and login functionalities using Node.js, Express, and MySQL. The system implements JWT (JSON Web Token) for securing the endpoints.

## Features

- User registration
- User login
- Protected profile endpoint
- Password hashing with bcryptjs
- JWT-based authentication

## Technologies Used

- Node.js
- Express
- MySQL
- Sequelize
- bcryptjs
- jsonwebtoken
- dotenv
- Jest
- Supertest

## Getting Started

### Prerequisites

- Node.js installed
- MySQL installed and running
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/auth-system.git
   cd auth-system

2. Install the dependencies:
   npm install
3. Create a .env file in the root directory with the following content, replacing the placeholders with your actual MySQL credentials and desired JWT secret:
4. Set up the MySQL database:

   ```
    mysql -u root -p
    CREATE DATABASE auth_db

## API Endpoints
```
-Register a new user
-URL: /register
-Method: POST
-Body Parameters:
-username: String (required, unique)
-email: String (required, unique)
-password: String (required)
