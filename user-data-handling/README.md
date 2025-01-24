# User Data Handling

## Description

This project is a simple user data handling application. It allows users to create, read, update, and delete user data. The application is built using Node.js, Express, and MongoDB.

## Requirements

- Node.js
- MongoDB

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of the project
4. Add the following environment variables to the `.env` file:

```
PORT=8080
MONGODB_URI=mongodb://localhost:27017/user-data
```

5. Run the application

```bash
npm run dev
```

6. Run tests

```bash
npm test
```

## API Documentation

The API documentation is available at [http://localhost:8080/api-docs](http://localhost:8080/api-docs).
