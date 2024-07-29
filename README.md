# BlogAssessment

Welcome to BlogAssessment! This repository contains both the frontend and backend code for the BlogAssessment project. Below you will find details about the project and instructions on how to run them locally.

## Frontend

The frontend is created using React.js. To run the frontend code, you need to have Node.js installed on your computer.

### Running the Frontend

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend

   ```

2. Install all dependencies:

   ```bash
   npm install

   ```

3. Start the frontend server:

   ```bash
     npm run start

   ```

This will install all the necessary dependencies and start the frontend development server.

## Backend

The backend is created using Node.js and Express.js. To start the backend server, follow these steps:

### Running the Backend

1. Navigate to the backend directory:

   ```bash
   cd backend

   ```

2. Configure the .env file:

   1. The .env file is included in the repository for simplicity. Ensure that you provide a valid MySQL server URL in the following format:

```bash
  DATABASE_URL="mysql://username:password@host:port/database"

```

3. Install all dependencies:

   ```bash
   npm install

   ```

4. Migrate the database:

```bash
   npx prisma migrate dev --name <migration name>

```

This command will migrate all updates to the database, creating tables and the database structure.

5. Start the backend server:

```bash
  npm run dev

```

Since this is a development environment, nodemon has been used to automatically restart the server on file changes.

### First-Time User

For first-time users, migrating the database will automatically create a user profile for you. Please find the credentials below:

Email: tempuser@gmail.com

Password: Sample@123
