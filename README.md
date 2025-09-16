# Campus Care - Backend API

Welcome to the backend server for **Campus Care**, a web application designed to help students connect with campus services like counseling, academic advising, and health check-ups. This server manages user authentication, appointment scheduling, and emergency notifications.

This README provides instructions for setting up, running, and interacting with the API.

---

## Features ✨

* **User Authentication**: Secure user registration and login system using JSON Web Tokens (JWT).
* **User Management**: Users can view, update, and delete their profiles.
* **Appointment Scheduling**: Students can book, view, update, and cancel appointments with various campus professionals.
* **Admin Functionality**: Admins can view all appointments and receive emergency notifications.
* **Emergency Email System**: A dedicated endpoint for users to send an emergency alert email to all registered administrators.

---

## Technologies Used 💻

* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose ODM
* **Authentication**: JSON Web Tokens (JWT)
* **Email Notifications**: Nodemailer
* **Environment Variables**: Dotenv
* **CORS**: `cors` package for handling cross-origin requests.

---

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

* Node.js (v18.x or later)
* npm (or yarn)
* MongoDB (A local instance or a cloud-hosted database like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of your project and add the following variables.

    ```env
    # Your MongoDB connection string
    MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<database>

    # A strong, secret string for signing JWT tokens
    JWT_SECRET_KEY=yourSuperSecretKeyHere

    # Your Gmail account for sending emergency emails
    EMAIL=youremail@gmail.com

    # Your Gmail App Password (recommended over your actual password)
    EMAIL_PASS=yourgmailapppassword
    ```

4.  **Run the server:**
    ```sh
    npm start
    ```
    The server should now be running on `http://localhost:8080`.

---

## API Endpoints 🚀

All endpoints are prefixed with `/api`. Authorization requires a Bearer Token in the `Authorization` header.

### Authentication

| Method | Endpoint    | Description                       | Request Body                                   |
| :----- | :---------- | :-------------------------------- | :--------------------------------------------- |
| `POST` | `/register` | Creates a new user account.       | `{ "username", "email", "phone", "password" }` |
| `POST` | `/login`    | Logs in a user and returns a JWT. | `{ "email", "password" }`                      |

---

### User Management

*Authentication Required: Yes*

| Method   | Endpoint | Description                          | Request Body (for Update/Delete)               |
| :------- | :------- | :----------------------------------- | :--------------------------------------------- |
| `GET`    | `/user`  | Gets the logged-in user's data.      | (None)                                         |
| `PATCH`  | `/user`  | Updates the logged-in user's data.   | `{ "username", "email", "phone", "password" }` |
| `DELETE` | `/user`  | Deletes the logged-in user's account. | `{ "email" }`                                  |

---

### Appointment Management

*Authentication Required: Yes*

| Method   | Endpoint                  | Description                                      | Request Body (for Create/Update) |
| :------- | :------------------------ | :------------------------------------------------- | :------------------------------- |
| `POST`   | `/appointment`            | Creates a new appointment.                         | (Appointment object)             |
| `GET`    | `/appointment/getAll`     | **(Admin)** Gets all appointments in the system.      | (None)                           |
| `GET`    | `/appointment/user/:userId` | Gets all appointments for a specific student ID.   | (None)                           |
| `PATCH`  | `/appointment/:id`        | Updates a specific appointment by its ID.          | (Fields to update)               |
| `DELETE` | `/appointment/delete/:id` | Deletes a specific appointment by its ID.          | (None)                           |

---

### Emergency Contact

*Authentication Required: Yes*

| Method | Endpoint             | Description                             | Request Body                       |
| :----- | :------------------- | :-------------------------------------- | :--------------------------------- |
| `POST` | `/emergency/contact` | Sends an emergency email to all admins. | `{ "useremail", "phone", "text" }` |
