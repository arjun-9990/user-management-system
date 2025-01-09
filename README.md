# User Management System

This project is a user management system built using **Node.js**, **Express.js**, **MySQL**, and **EJS**. It provides CRUD functionality for managing users along with basic authentication for updating and deleting user accounts.

## Features

### 1. **Home Page**
- Displays the total count of users in the database.

### 2. **View Users**
- View all users in both non-tabular and tabular formats.

### 3. **Add User**
- Create a new user with a unique ID, username, email, and password.

### 4. **Edit User**
- Edit user details. Requires the correct password to confirm the update.

### 5. **Delete User**
- Delete a user by providing the correct email and password.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript)
- **Database**: MySQL
- **Fake Data Generation**: Faker.js
- **UUID Generation**: UUID package

## How to Run the Project

### Prerequisites
1. Install [Node.js](https://nodejs.org/).
2. Install [MySQL](https://www.mysql.com/).
3. Install npm packages:
   ```bash
   npm install
   ```

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Create a `.env` file and configure your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=<your-database-username>
   DB_PASSWORD=<your-database-password>
   DB_NAME=delta
   ```
4. Run the MySQL script to create the database and required tables.
5. Start the application:
   ```bash
   npm start
   ```
6. Open the application in your browser at `http://localhost:3000`.

## Routes and APIs

### 1. **Home Page**
   - **GET** `/`
   - Displays the total count of users in the database.

### 2. **View All Users**
   - **GET** `/user` (Non-tabular format)
   - **GET** `/users` (Tabular format)

### 3. **Add User**
   - **GET** `/users/add`
   - **POST** `/users`
   - Adds a new user to the database.

### 4. **Edit User**
   - **GET** `/users/:id/edit`
   - **PATCH** `/users/:id`
   - Updates user details after verifying the password.

### 5. **Delete User**
   - **GET** `/users/:id/deletepass`
   - **DELETE** `/users/:id`
   - Deletes a user after verifying the email and password.

## Database Schema
The `user` table contains the following fields:
- **id**: Unique identifier for the user (UUID).
- **username**: Username of the user.
- **email**: Email address of the user.
- **password**: Password for the user account.

## Future Improvements
- Add JWT authentication for better security.
- Enhance the UI using CSS frameworks like Bootstrap or TailwindCSS.
- Implement client-side and server-side form validation.
- Add pagination for the user list.
- Improve error handling and logging.

## License
This project is open source and available under the [MIT License](LICENSE).

---

Feel free to contribute or raise issues to enhance this project!
