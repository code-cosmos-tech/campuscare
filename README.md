# Campus Care: A Full-Stack MERN Application

Welcome to **Campus Care**, a web application designed to help students connect with campus services like counseling, academic advising, and health check-ups. This project is a complete MERN (MongoDB, Express.js, React, Node.js) stack application that manages user authentication, appointment scheduling, and emergency notifications through a secure and modern user interface.

This document provides all the necessary instructions to set up, run, and understand the entire project, including both the backend API and the frontend client.

---

## Features ✨

* **Modern User Interface**: Clean, responsive design built with React and styled with CSS.
* **Animated & Interactive**: Smooth page transitions and interactions powered by Framer Motion.
* **Secure User Authentication**: Full registration and login system using JSON Web Tokens (JWT).
* **Complete User Management**: Users can view, update, and delete their profiles.
* **Comprehensive Appointment System**:
    * Students can book new appointments through a multi-step form.
    * Users can view their personal upcoming and past appointments.
    * **(Admin)** Admins have access to a dashboard to view all appointments booked across the platform.
* **Centralized State Management**: Global state for user data and authentication is managed via React Context.
* **Support & Resources**: Dedicated pages for immediate support hotlines and a toolkit of wellness articles and videos.
* **Emergency Email System**: A dedicated feature for users to send an emergency alert email directly to all registered administrators.
* **Notifications**: User-friendly feedback and alerts using `react-toastify`.

---

## Technologies Used 💻

### Backend

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB with Mongoose ODM
* **Authentication**: JSON Web Tokens (JWT)
* **Email**: Nodemailer
* **CORS**: `cors` package

### Frontend

* **Framework**: React (with Vite)
* **Routing**: React Router
* **State Management**: React Context API
* **Animations**: Framer Motion
* **HTTP Client**: Native `fetch` API
* **Notifications**: React Toastify
* **Icons**: React Icons

---

## Getting Started

To get the full application running locally, you need to set up both the backend server and the frontend client.

### **Part 1: Backend Setup**

1.  **Clone the backend repository:**
    ```sh
    git clone <your-backend-repository-url>
    cd <backend-repository-name>
    ```

2.  **Install backend dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Backend Environment Variables:**
    Create a `.env` file in the root of the **backend** project and add the following:
    ```env
    # Your MongoDB connection string
    MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<database>

    # A strong, secret string for signing JWT tokens
    JWT_SECRET_KEY=yourSuperSecretKeyHere

    # Your Gmail account for sending emergency emails
    EMAIL=youremail@gmail.com

    # Your Gmail App Password
    EMAIL_PASS=yourgmailapppassword
    ```

4.  **Run the backend server:**
    ```sh
    npm start
    ```
    The server should now be running on `http://localhost:8080`. Keep this terminal open.

### **Part 2: Frontend Setup**

1.  **Clone the frontend repository in a new terminal:**
    ```sh
    git clone <your-frontend-repository-url>
    cd <frontend-repository-name>
    ```

2.  **Install frontend dependencies:**
    ```sh
    npm install
    ```

3.  **Configure API URL:**
    The API URL in the frontend is configured in `src/store/Auth.jsx`. Ensure it points to your running backend server. The default is already correct if your backend is running on port 8080.
    ```javascript
    // src/store/Auth.jsx
    const URL = "http://localhost:8080";
    ```

4.  **Run the frontend development server:**
    ```sh
    npm run dev
    ```
    The React application should now be running on `http://localhost:5173` and connected to your local backend.

---

## API Endpoints 🚀

The backend provides the following endpoints, all prefixed with `/api`. Authorization requires a Bearer Token.

### Authentication

| Method | Endpoint    | Description                       | Request Body                                   |
| :----- | :---------- | :-------------------------------- | :--------------------------------------------- |
| `POST` | `/register` | Creates a new user account.       | `{ "username", "email", "phone", "password" }` |
| `POST` | `/login`    | Logs in a user and returns a JWT. | `{ "email", "password" }`                      |

### User Management

*Authentication Required: Yes*

| Method   | Endpoint | Description                          | Request Body (for Update/Delete)               |
| :------- | :------- | :----------------------------------- | :--------------------------------------------- |
| `GET`    | `/user`  | Gets the logged-in user's data.      | (None)                                         |
| `PATCH`  | `/user`  | Updates the logged-in user's data.   | `{ "username", "email", "phone", "password" }` |
| `DELETE` | `/user`  | Deletes the logged-in user's account. | `{ "email" }`                                  |

### Appointment Management

*Authentication Required: Yes*

| Method   | Endpoint                  | Description                                      | Request Body (for Create/Update) |
| :------- | :------------------------ | :------------------------------------------------- | :------------------------------- |
| `POST`   | `/appointment`            | Creates a new appointment.                         | (Appointment object)             |
| `GET`    | `/appointment/getAll`     | **(Admin)** Gets all appointments in the system.      | (None)                           |
| `GET`    | `/appointment/user/:userId` | Gets all appointments for a specific student ID.   | (None)                           |
| `PATCH`  | `/appointment/:id`        | Updates a specific appointment by its ID.          | (Fields to update)               |
| `DELETE` | `/appointment/delete/:id` | Deletes a specific appointment by its ID.          | (None)                           |

### Emergency Contact

*Authentication Required: Yes*

| Method | Endpoint             | Description                             | Request Body                       |
| :----- | :------------------- | :-------------------------------------- | :--------------------------------- |
| `POST` | `/emergency/contact` | Sends an emergency email to all admins. | `{ "useremail", "phone", "text" }` |

---

## Frontend Project Structure

The frontend follows a standard React application structure for organization.

```
src
├── App.jsx            # Main application component with routing
├── main.jsx           # Entry point of the application
├── components
│   └── layout
│       └── Navbar.jsx # Reusable navigation bar
├── pages
│   ├── user           # Contains all user-facing pages
│   │   ├── Login.jsx, Register.jsx, Home.jsx, Profile.jsx
│   │   ├── Appointment.jsx, BookAppointments.jsx
│   │   └── ViewAllAppointments.jsx
└── store
    └── Auth.jsx       # AuthContext for global state management
```
